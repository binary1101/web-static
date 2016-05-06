import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCalendar } from '../../actions/CalendarActions';
import { flowViewStyle } from '../../actions/FlowActions';
import { deleteEntry, getTlogEntries, getTlogEntriesIfNeeded } from '../../actions/TlogEntriesActions';
import { appStateSetSearchKey } from '../../actions/AppStateActions';
import {
  SEARCH_KEY_TLOG,
  SEARCH_KEY_MYTLOG,
  SEARCH_KEY_FLOW,
  SEARCH_KEY_FAVORITES,
  SEARCH_KEY_PRIVATES,
} from '../../constants/SearchConstants';
import { sendCategory } from '../../../../shared/react/services/Sociomantic';

import TlogPageBody from './TlogPageBody';
import FlowPageBody from './FlowPageBody';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../../../../shared/constants/Tlog';

export function getTlog(tlogs, slug) {
  const [ tlogId ] = Object.keys(tlogs).filter((id) => tlogs[id].slug === slug);

  return tlogs[tlogId] || {};
}

class TlogPageContainer extends Component {
  componentWillMount() {
    const { appStateSetSearchKey, getTlogEntriesIfNeeded } = this.props;

    getTlogEntriesIfNeeded(this.reqParams(this.props));
    appStateSetSearchKey(this.searchKey(this.props));
    sendCategory(this.section(this.props));
  }
  componentWillReceiveProps(nextProps) {
    const { appStateSetSearchKey, getTlogEntriesIfNeeded } = this.props;
    const section = this.section(this.props);
    const nextSection = this.section(nextProps);
    const searchKey = this.searchKey(this.props);
    const nextSearchKey = this.searchKey(nextProps);

    getTlogEntriesIfNeeded(this.reqParams(nextProps));
    if (searchKey !== nextSearchKey) {
      appStateSetSearchKey(nextSearchKey);
    }

    if (section !== nextSection) {
      sendCategory(nextSection);
    }
  }
  reqParams(props) {
    const { params, location } = props;

    return {
      slug: params.slug,
      section: this.section(props),
      date: this.date(params),
      query: this.query(location),
    };
  }
  query({ query }) {
    return query && query.q;
  }
  appendTlogEntries() {
    const { getTlogEntries } = this.props;

    getTlogEntries(Object.assign(
      this.reqParams(this.props),
      { sinceId: this.props.tlogEntries.data.nextSinceEntryId }
    ));
  }
  searchKey(props) {
    const { currentUser, tlog } = props;
    const section = this.section(props);

    if (section === TLOG_SECTION_TLOG) {
      if (tlog.id === currentUser.id) {
        return SEARCH_KEY_MYTLOG;
      } else {
        return tlog.isFlow ? SEARCH_KEY_FLOW : SEARCH_KEY_TLOG;
      }
    } else if (section === TLOG_SECTION_FAVORITE) {
      return SEARCH_KEY_FAVORITES;
    } else if (section === TLOG_SECTION_PRIVATE) {
      return SEARCH_KEY_PRIVATES;
    } else {
      return SEARCH_KEY_TLOG;
    }
  }
  section(props) {
    const { path } = props.route;
    
    if (this.date(props.params)) {
      return TLOG_SECTION_TLOG;
    } else if (path === TLOG_SECTION_PRIVATE || path === TLOG_SECTION_FAVORITE) {
      return path;
    } else {
      return TLOG_SECTION_TLOG;
    }
  }
  date(params = {}) {
    const { year, month, day } = params;

    return (year && month && day) && `${year}-${month}-${day}`;
  }
  render() {
    const { currentUser, deleteEntry, flow, flowViewStyle,
            getCalendar, location, queryString, tlog, tlogEntries } = this.props;
    const currentUserId = currentUser.id;

    return tlog.isFlow
      ? <FlowPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={{ opacity: tlog.design ? tlog.design.feedOpacity : '1.0' }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          flow={flow}
          flowViewStyle={flowViewStyle}
          location={location}
          queryString={queryString}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
      : <TlogPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={{ opacity: tlog.design ? tlog.design.feedOpacity : '1.0' }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          getCalendar={getCalendar}
          queryString={queryString}
          section={this.section(this.props)}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />;
  }
}

TlogPageContainer.propTypes = {
  appStateSetSearchKey: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowViewStyle: PropTypes.func.isRequired,
  getCalendar: PropTypes.func.isRequired,
  getTlogEntries: PropTypes.func.isRequired,
  getTlogEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  route: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
};

export default connect(
  (state, { params }) => {
    const { comment, entry, entryCollItem, tlog } = state.entities;

    function tlogItem(id) {
      if (!id) {
        return void 0;
      }

      const t = tlog[id];
      const author = tlog[t.author];

      return Object.assign({}, t, { author });
    }

    const items = state.tlogEntries.data.items.map((entryCollId) => {
      const { commentator, entry: entryId } = entryCollItem[entryCollId];
      const entryItem = entry[entryId];

      return {
        commentator: tlogItem(commentator),
        entry: Object.assign({}, entryItem, {
          author: tlog[entryItem.author],
          commentator: tlogItem(entryItem.commentator),
          tlog: tlogItem(entryItem.tlog),
          comments: entryItem.comments.map((commentId) => {
            const c = comment[commentId];

            return Object.assign({}, c, { user: tlogItem(c.user) });
          }),
        }),
      };
    });
    const tlogEntries = Object.assign({}, state.tlogEntries, {
      data: Object.assign({}, state.tlogEntries.data, { items }),
    });
    
    return {
      tlogEntries,
      currentUser: state.currentUser.data,
      flow: state.flow,
      tlog: getTlog(tlog, params.slug),
    };
  },
  {
    appStateSetSearchKey,
    deleteEntry,
    getCalendar,
    getTlogEntries,
    getTlogEntriesIfNeeded,
    flowViewStyle,
  }
)(TlogPageContainer);
