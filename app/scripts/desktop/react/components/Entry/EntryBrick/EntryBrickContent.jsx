import ErrorService from '../../../../../shared/react/services/Error';
import EntryBrickTextType from './EntryBrickTextType';
import EntryBrickImageType from './EntryBrickImageType';
import EntryBrickVideoType from './EntryBrickVideoType';
import EntryBrickQuoteType from './EntryBrickQuoteType';
import EntryBrickLinkType from './EntryBrickLinkType';
import EntryBrickSongType from './EntryBrickSongType';
import EntryBrickCodeType from './EntryBrickCodeType';
import EntryBrickUnknownType from './EntryBrickUnknownType';

const ENTRY_TEXT_TYPE = 'text',
      ENTRY_IMAGE_TYPE = 'image',
      ENTRY_VIDEO_TYPE = 'video',
      ENTRY_QUOTE_TYPE = 'quote',
      ENTRY_LINK_TYPE = 'link',
      ENTRY_SONG_TYPE = 'song',
      ENTRY_CODE_TYPE = 'code',
      ENTRY_CONVO_TYPE = 'convo',
      ENTRY_ANONYMOUS_TYPE = 'anonymous';

let EntryBrickContent = React.createClass({
  propTypes: {
    entry: React.PropTypes.object.isRequired,
    hasModeration: React.PropTypes.bool.isRequired,
    onEntryAccept: React.PropTypes.func.isRequired,
    onEntryDecline: React.PropTypes.func.isRequired
  },

  render() {
    switch(this.props.entry.type) {
      case ENTRY_TEXT_TYPE:
      case ENTRY_ANONYMOUS_TYPE:
      case ENTRY_CONVO_TYPE:
        return <EntryBrickTextType {...this.props} />;
      case ENTRY_IMAGE_TYPE:
        return <EntryBrickImageType {...this.props} />;
      case ENTRY_VIDEO_TYPE:
        return <EntryBrickVideoType {...this.props} />;
      case ENTRY_QUOTE_TYPE:
        return <EntryBrickQuoteType {...this.props} />;
      case ENTRY_LINK_TYPE:
        return <EntryBrickLinkType {...this.props} />;
      case ENTRY_SONG_TYPE:
        return <EntryBrickSongType {...this.props} />;
      case ENTRY_CODE_TYPE:
        return <EntryBrickCodeType {...this.props} />;
      default:
        ErrorService.notifyWarning('Неизвестный тип brick-поста', {
          componentName: this.constructor.displayName,
          method: 'render',
          entryID: this.props.entry.id,
          entryType: this.props.entry.type
        });

        return <EntryBrickUnknownType {...this.props} />;
    }
  }
});

export default EntryBrickContent;