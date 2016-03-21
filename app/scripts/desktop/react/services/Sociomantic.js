import { sha256 } from 'js-sha256';

export const SM_TLOG_ENTRY = 'Пост';

const advToken = 'taaasty-ru';

const x = document.getElementsByTagName('script')[0];
const s = document.createElement('script');
s.type  = 'text/javascript';
s.async = true;
s.src   = ( 'https:' == document.location.protocol ? 'https://' : 'http://') +
  'eu-sonar.sociomantic.com/js/2010-07-01/adpan/taaasty-ru';
x.parentNode.insertBefore( s, x );

export function sendCategory(...args) {
  if (!window.sociomantic) {
    window.product = { category: [ ...args ] };
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.product = { category: [ ...args ] };
  window.sociomantic.sonar.adv[advToken].track();
}

export function sendUser(user) {
  if (!window.sociomantic) {
    window.customer = {
      identifier: user.id.toString(),
      mhash: user.email && sha256(user.email),
    };
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.customer = {
    identifier: user.id.toString(),
    mhash: user.email && sha256(user.email) || void 0,
  };
  window.sociomantic.sonar.adv[advToken].track();
}

export function sendRegister(id) {
  if (!window.sociomantic) {
    window.lead = { transaction: id.toString() };
    return;
  }

  window.sociomantic.sonar.adv[advToken].clear();
  window.lead = { transaction: id.toString() };
  window.sociomantic.sonar.adv[advToken].track();
}
