DesignSettingsMixin    = require './mixins/index'
DesignSettingsDropZone = require './DropZone/index'
DesignSettingsGroups   = require './Groups/index'

DesignSettings = React.createClass
  displayName: 'DesignSettings'
  mixins: [DesignSettingsMixin]

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups groups={ @props.groups } />
      </div>
    </div>

#                                     <section class="design-settings__group">
#                                         <header class="design-settings__group-header">Фон</header>
#                                         <div class="design-settings__group-content">
#                                             <div class="design-settings__option design-settings__option--bgcolor">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Цвет</span>
#                                                     <span class="design-settings__state design-settings__state--circlebtn ds-absolute-right ds-fadeout-right">
#                                                         <span class="design-settings__state-i"></span>
#                                                     </span>
#                                                     <span class="form-radiogroup form-radiogroup--circlebtns ds-absolute-left ds-fadein-down">
#                                                         <span class="form-radiobtn form-radiobtn--white">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-white" type="radio" name="designTlog-bgColor" value="white" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-white">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Белый</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--black">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-black" type="radio" name="designTlog-bgColor" value="black" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-black">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Чёрный</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--custom">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-custom" type="radio" name="designTlog-bgColor" value="custom" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-custom">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Любой</span>
#                                                                 </span>
#                                                                 <span data-react-class="ColorPicker"></span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--cinnabar">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-cinnabar" type="radio" name="designTlog-bgColor" value="cinnabar" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-cinnabar">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Синнобар</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--silversand">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-silversand" type="radio" name="designTlog-bgColor" value="silversand" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-silversand">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серебряный песок</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--bluegray">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgColor-bluegray" type="radio" name="designTlog-bgColor" value="bluegray" checked="checked" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgColor-bluegray">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серо-голубой</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span>
#                                                     </span>
#                                                 </div>
#                                             </div>
#                                             <div class="design-settings__option design-settings__option--bgimage">
#                                                 <div class="progressbar __hidden"><div class="progressbar__bg"></div></div>
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Картинка<span class="free">free</span></span>
#                                                     <span class="design-settings__text ds-absolute-left ds-fadein-down">
#                                                         Перетащите или<span class="form-upload form-upload--cover">
#                                                             <span class="form-upload__text">загрузите</span>
#                                                             <input class="form-upload__input" type="file" name="designTlog-bgImage" />
#                                                         </span>
#                                                     </span>
#                                                     <span class="design-settings__cover ds-absolute-right ds-fadeout-right" style="background-image:url(http://taaasty.ru/assets/backgrounds/67/9d/1814095_079F4585-797D-4509-85C4-DDC462567EAB.jpg);"></span>
#                                                     <span class="design-settings__text ds-absolute-right ds-fadein-left">
#                                                         <span class="form-checkbox">
#                                                             <input class="form-checkbox__input" id="designTlog-bgImage-visibility" type="checkbox" name="designTlog-bgImage" value="none" />
#                                                             <label for="designTlog-bgImage-visibility" class="form-checkbox__label">
#                                                                 <span class="form-checkbox__box"><i class="form-checkbox__icon"></i></span>Вкл
#                                                             </label>
#                                                         </span>
#                                                     </span>
#                                                 </div>
#                                             </div>
#                                             <div class="design-settings__option design-settings__option--bgalignment">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Выравнивание<span class="free">free</span></span>
#                                                     <span class="form-radiogroup form-radiogroup--dotted ds-absolute-left ds-fadein-down">
#                                                         <span class="form-radiobtn form-radiobtn--justify">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgAlignment-justify" type="radio" name="designTlog-bgAlignment" value="justify" checked="checked" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgAlignment-justify">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">по ширине</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--center">
#                                                             <input class="form-radiobtn__input" id="designTlog-bgAlignment-center" type="radio" name="designTlog-bgAlignment" value="center" />
#                                                             <label class="form-radiobtn__label" for="designTlog-bgAlignment-center">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">по центру</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span>
#                                                     </span>
#                                                 </div>
#                                             </div>
#                                         </div>
#                                     </section>
#                                     <section class="design-settings__group">
#                                         <header class="design-settings__group-header">Лента</header>
#                                         <div class="design-settings__group-content">
#                                             <div class="design-settings__option design-settings__option--feedbgcolor">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Цвет фона</span>
#                                                     <span class="design-settings__state design-settings__state--circlebtn ds-absolute-right ds-fadeout-right">
#                                                         <span class="design-settings__state-i"></span>
#                                                     </span>
#                                                     <span class="form-radiogroup form-radiogroup--circlebtns ds-absolute-left ds-fadein-down">
#                                                         <span class="form-radiobtn form-radiobtn--white">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-white" type="radio" name="designTlog-feedBgColor" value="white" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-white">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Белый</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--black">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-black" type="radio" name="designTlog-feedBgColor" value="black" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-black">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Чёрный</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--custom">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-custom" type="radio" name="designTlog-feedBgColor" value="custom" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-custom">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Любой</span>
#                                                                 </span>
#                                                                 <span data-react-class="ColorPicker"></span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--cinnabar">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-cinnabar" type="radio" name="designTlog-feedBgColor" value="cinnabar" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-cinnabar">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Синнобар</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--silversand">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-silversand" type="radio" name="designTlog-feedBgColor" value="silversand" checked="checked" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-silversand">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серебряный песок</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--bluegray">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedBgColor-bluegray" type="radio" name="designTlog-feedBgColor" value="bluegray" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedBgColor-bluegray">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серо-голубой</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span>
#                                                     </span>
#                                                 </div>
#                                             </div>
#                                             <div class="design-settings__option design-settings__option--feedfont">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Шрифт текста</span>
#                                                     <span class="design-settings__state design-settings__state--font ds-absolute-right ds-fadeout-right">
#                                                         <span class="design-settings__state-i">Aa</span>
#                                                     </span>
#                                                     <div class="slider ds-fadein-down">
#                                                         <div class="slider__main">
#                                                             <div class="slider__list">
#                                                                 <div class="slider__table">
#                                                                     <div class="slider__table-cell">
#                                                                         <span class="form-radiogroup form-radiogroup--font">
#                                                                             <span class="form-radiobtn form-radiobtn--ptsans" data-original-title="PT Sans" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-ptsans" type="radio" name="designTlog-feedFont" value="ptsans" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-ptsans">
#                                                                                     <span class="free">free</span>
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--ptserif" data-original-title="PT Serif" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-ptserif" type="radio" name="designTlog-feedFont" value="ptserif" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-ptserif">
#                                                                                     <span class="free">free</span>
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--roboto" data-original-title="Roboto" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-roboto" type="radio" name="designTlog-feedFont" value="roboto" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-roboto">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--lora" data-original-title="Lora" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-lora" type="radio" name="designTlog-feedFont" value="lora" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-lora">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--philosopher" data-original-title="Philosopher" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-philosopher" type="radio" name="designTlog-feedFont" value="philosopher" checked="checked" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-philosopher">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--ptmono" data-original-title="PT Mono" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-ptmono" type="radio" name="designTlog-feedFont" value="ptmono" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-ptmono">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--berenisadfpro" data-original-title="Berenis ADF Pro" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-berenisadfpro" type="radio" name="designTlog-feedFont" value="berenisadfpro" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-berenisadfpro">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--djserif" data-original-title="DejaVu Serif Condensed" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-djserif" type="radio" name="designTlog-feedFont" value="djserif" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-djserif">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--heuristica" data-original-title="Heuristica" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-heuristica" type="radio" name="designTlog-feedFont" value="heuristica" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-heuristica">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--permian" data-original-title="Permian Slab Serif" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-permian" type="radio" name="designTlog-feedFont" value="permian" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-permian">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--robotoslab" data-original-title="Roboto Slab" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-robotoslab" type="radio" name="designTlog-feedFont" value="robotoslab" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-robotoslab">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span><span class="form-radiobtn form-radiobtn--clearsans" data-original-title="Clear Sans" data-container="body" design-settings-tooltip>
#                                                                                 <input class="form-radiobtn__input" id="designTlog-feedFont-clearsans" type="radio" name="designTlog-feedFont" value="clearsans" />
#                                                                                 <label class="form-radiobtn__label" for="designTlog-feedFont-clearsans">
#                                                                                     <span class="form-radiobtn__inner">
#                                                                                         <span class="form-radiobtn__text">Aa</span>
#                                                                                     </span>
#                                                                                 </label>
#                                                                             </span>
#                                                                         </span>
#                                                                     </div>
#                                                                 </div>
#                                                             </div>
#                                                         </div>
#                                                     </div>
#                                                 </div>
#                                             </div>
#                                             <div class="design-settings__option design-settings__option--feedcolor">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Цвет текста</span>
#                                                     <span class="design-settings__state design-settings__state--circlebtn ds-absolute-right ds-fadeout-right">
#                                                         <span class="design-settings__state-i"></span>
#                                                     </span>
#                                                     <span class="form-radiogroup form-radiogroup--circlebtns ds-absolute-left ds-fadein-down">
#                                                         <span class="form-radiobtn form-radiobtn--white">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedColor-white" type="radio" name="designTlog-feedColor" value="white" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedColor-white">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Белый</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--black">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedColor-black" type="radio" name="designTlog-feedColor" value="black" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedColor-black">
#                                                                 <span class="free">free</span>
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Чёрный</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--silversand">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedColor-silversand" type="radio" name="designTlog-feedColor" value="silversand" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedColor-silversand">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серебряный песок</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--bluegray">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedColor-bluegray" type="radio" name="designTlog-feedColor" value="bluegray" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedColor-bluegray">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Серо-голубой</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span><span class="form-radiobtn form-radiobtn--madison">
#                                                             <input class="form-radiobtn__input" id="designTlog-feedColor-madison" type="radio" name="designTlog-feedColor" value="madison" checked="checked" />
#                                                             <label class="form-radiobtn__label" for="designTlog-feedColor-madison">
#                                                                 <span class="form-radiobtn__inner">
#                                                                     <span class="form-radiobtn__text">Мэдисон</span>
#                                                                 </span>
#                                                             </label>
#                                                         </span>
#                                                     </span>
#                                                 </div>
#                                             </div>
#                                             <div class="design-settings__option design-settings__option--opacity">
#                                                 <div class="design-settings__option-content">
#                                                     <span class="design-settings__text ds-absolute-left ds-fadeout-down">Прозрачность<span class="free">free</span></span>
#                                                     <span class="form-range ds-absolute-left ds-fadein-down">
#                                                         <input class="form-range__input" type="text" name="designTlog-feedOpacity" />
#                                                         <div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 59.5959595959596%;"></div>
#                                                         <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0" style="left: 59.5959595959596%;"></span>
#                                                     </span>
#                                                     <span class="form-range-value">59%</span>
#                                                 </div>
#                                             </div>
#                                         </div>
#                                     </section>
#                                 </div>
#                                 <div class="scroller__track js-scroller-track">
#                                     <div class="scroller__bar js-scroller-bar"></div>
#                                 </div>
#                             </div>
#                         </div>
#                         <button class="design-settings__save-button">Сохранить</button>
#                     </div>
#                 </div>
#             </div>
#         </div> -->
#         <!-- end Design Settings

#         <!-- Payment -->
# <!--         <div class="popup-container">
#             <div class="popup-container__main">
#                 <div class="popup-container__cell">
#                     <div class="popup popup--payment">
#                         <div class="popup__header">
#                             <div class="popup__headbox">
#                                 <h3 class="popup__title">Что вы получаете?</h3>
#                             </div>
#                             <div class="popup__close">
#                                 <i class="icon icon--cross"></i>
#                             </div>
#                         </div>
#                         <div class="popup__body">
#                             <div class="payment">
#                                 <section class="payment__section payment__section--list">
#                                     <ul class="payment__list">
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">14 новых шрифтов заголовков</div>
#                                             <div class="payment__item-content">
#                                                 <div class="slider">
#                                                     <div class="slider__main">
#                                                         <div class="slider__list">
#                                                             <div class="slider__table">
#                                                                 <div class="slider__table-cell">
#                                                                     <span class="form-radiogroup form-radiogroup--font">
#                                                                         <span class="form-radiobtn form-radiobtn--notoserif" data-original-title="Noto Serif" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--comfortaa" data-original-title="Comfortaa" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--airbornepilot" data-original-title="Airborne Pilot" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--amaranth" data-original-title="Amaranth" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--beermoney" data-original-title="Beer Money" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--dancingscript" data-original-title="Dancing Script" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--greatvibes" data-original-title="Great Vibes" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--veles" data-original-title="Veles" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--zion" data-original-title="ZionTrain" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--nautilus" data-original-title="Nautilus Pompilius" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--ospdin" data-original-title="OSP-DIN" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--pecita" data-original-title="Pecita" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--poetsen" data-original-title="PoetsenOne" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--yessireebob" data-original-title="Yes Siree Bob" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span>
#                                                                     </span>
#                                                                 </div>
#                                                             </div>
#                                                         </div>
#                                                     </div>
#                                                 </div>
#                                             </div>
#                                         </li>
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">12 новых шрифтов тлога</div>
#                                             <div class="payment__item-content">
#                                                 <div class="slider">
#                                                     <div class="slider__main">
#                                                         <div class="slider__list">
#                                                             <div class="slider__table">
#                                                                 <div class="slider__table-cell">
#                                                                     <span class="form-radiogroup form-radiogroup--font">
#                                                                         <span class="form-radiobtn form-radiobtn--roboto" data-original-title="Roboto" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--lora" data-original-title="Lora" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--philosopher" data-original-title="Philosopher" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--ptmono" data-original-title="PT Mono" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--berenisadfpro" data-original-title="Berenis ADF Pro" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--djserif" data-original-title="DejaVu Serif Condensed" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--heuristica" data-original-title="Heuristica" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--permian" data-original-title="Permian Slab Serif" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--robotoslab" data-original-title="Roboto Slab" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span><span class="form-radiobtn form-radiobtn--clearsans" data-original-title="Clear Sans" data-container="body" tooltip>
#                                                                             <label class="form-radiobtn__label">
#                                                                                 <span class="form-radiobtn__inner">
#                                                                                     <span class="form-radiobtn__text">Aa</span>
#                                                                                 </span>
#                                                                             </label>
#                                                                         </span>
#                                                                     </span>
#                                                                 </div>
#                                                             </div>
#                                                         </div>
#                                                     </div>
#                                                 </div>
#                                             </div>
#                                         </li>
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">Любые цвета ленты, шрифта, заголовка</div>
#                                             <div class="payment__item-content">
#                                                 <span class="form-radiogroup form-radiogroup--circlebtns">
#                                                     <span class="form-radiobtn form-radiobtn--custom">
#                                                         <label class="form-radiobtn__label">
#                                                             <span class="form-radiobtn__inner">
#                                                                 <span class="form-radiobtn__text">Любой</span>
#                                                             </span>
#                                                             <span data-react-class="ColorPicker" data-react-props='{"disabled": true}'></span>
#                                                         </label>
#                                                     </span><span class="form-radiobtn form-radiobtn--cinnabar">
#                                                         <label class="form-radiobtn__label">
#                                                             <span class="form-radiobtn__inner">
#                                                                 <span class="form-radiobtn__text">Синнобар</span>
#                                                             </span>
#                                                         </label>
#                                                     </span><span class="form-radiobtn form-radiobtn--silversand">
#                                                         <label class="form-radiobtn__label">
#                                                             <span class="form-radiobtn__inner">
#                                                                 <span class="form-radiobtn__text">Серебряный песок</span>
#                                                             </span>
#                                                         </label>
#                                                     </span><span class="form-radiobtn form-radiobtn--bluegray">
#                                                         <label class="form-radiobtn__label">
#                                                             <span class="form-radiobtn__inner">
#                                                                 <span class="form-radiobtn__text">Серо-голубой</span>
#                                                             </span>
#                                                         </label>
#                                                     </span>
#                                                 </span>
#                                             </div>
#                                         </li>
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">Условия</div>
#                                             <div class="payment__item-content">Вы платите всего один раз и возможности настройки дизайна остаются с Вами навсегда</div>
#                                         </li>
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">Стоимость</div>
#                                             <div class="payment__item-content">299 рублей</div>
#                                         </li>
#                                         <li class="payment__item">
#                                             <div class="payment__item-title">Способы оплаты<br /> (без комиссии)</div>
#                                             <div class="payment__item-content">Со счета мобильного телефона, банковской картой, через терминалы, салоны связи, яндекс.деньги, веб-мани</div>
#                                         </li>
#                                     </ul>
#                                     <button class="payment__button">Перейти к оплате</button>
#                                 </section>
#                                 <section class="payment__section payment__section--success" style="display: none;">
#                                     <div class="payment__message">
#                                         <div class="payment__table">
#                                             <div class="payment__table-cell">
#                                                 <div class="payment__message-icon">:)</div>
#                                                 <p class="payment__message-text">Поздравляем, теперь Вы можете использовать любые настройки дизайна</p>
#                                             </div>
#                                         </div>
#                                     </div>
#                                     <button class="payment__button">Вернуться в тлог</button>
#                                 </section>
#                                 <section class="payment__section payment__section--process" style="display: none;">
#                                     <div class="payment__message">
#                                         <div class="payment__table">
#                                             <div class="payment__table-cell">
#                                                 <div class="payment__message-icon">
#                                                     <span class="spinner spinner--31x31">
#                                                         <span class="spinner__icon"></span>
#                                                     </span>
#                                                 </div>
#                                                 <p class="payment__message-text">Идет обработка платежа</p>
#                                             </div>
#                                         </div>
#                                     </div>
#                                 </section>
#                                 <section class="payment__section payment__section--error" style="display: none;">
#                                     <div class="payment__message">
#                                         <div class="payment__table">
#                                             <div class="payment__table-cell">
#                                                 <div class="payment__message-icon">:(</div>
#                                                 <p class="payment__message-text">Ошибка платежа, попробуйте еще раз</p>
#                                             </div>
#                                         </div>
#                                     </div>
#                                     <button class="payment__button">Вернуться в тлог</button>
#                                 </section>
#                             </div>
#                         </div>
#                     </div>
#                 </div>

module.exports = DesignSettings