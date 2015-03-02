DesignSettingsMixin =

  getDefaultProps: ->
    groups:
      header:
        font:
          style: 'font'
          optionName: 'headerfont'
          stateName: 'designTlog-headerFont'
          value: 'notoserif'
          items: [
            {
              value: 'proximanova'
              title: 'Proxima Nova'
              text: 'Aa'
              free: true
            }
            {
              value: 'notoserif'
              title: 'Noto Serif'
              text: 'Aa'
              free: false
            }
            {
              value: 'comfortaa'
              title: 'Comfortaa'
              text: 'Aa'
              free: false
            }
            {
              value: 'airbornepilot'
              title: 'Airborne Pilot'
              text: 'Aa'
              free: false
            }
            {
              value: 'amaranth'
              title: 'Amaranth'
              text: 'Aa'
              free: false
            }
            {
              value: 'beermoney'
              title: 'Beer Money'
              text: 'Aa'
              free: false
            }
            {
              value: 'dancingscript'
              title: 'Dancing Script'
              text: 'Aa'
              free: false
            }
            {
              value: 'greatvibes'
              title: 'Great Vibes'
              text: 'Aa'
              free: false
            }
            {
              value: 'veles'
              title: 'Veles'
              text: 'Aa'
              free: false
            }
            {
              value: 'zion'
              title: 'ZionTrain'
              text: 'Aa'
              free: false
            }
            {
              value: 'nautilus'
              title: 'Nautilus Pompilius'
              text: 'Aa'
              free: false
            }
            {
              value: 'ospdin'
              title: 'OSP-DIN'
              text: 'Aa'
              free: false
            }
            {
              value: 'pecita'
              title: 'Pecita'
              text: 'Aa'
              free: false
            }
            {
              value: 'poetsen'
              title: 'PoetsenOne'
              text: 'Aa'
              free: false
            }
            {
              value: 'yessireebob'
              title: 'Yes Siree Bob'
              text: 'Aa'
              free: false
            }
          ]
        size:
          style: 'dotted'
          optionName: 'headersize'
          stateName: 'designTlog-headerSize'
          value: 'middle'
          items: [
            {
              value: 'middle'
              title: 'средний'
              text: 'средний'
              free: true
            }
            {
              value: 'small'
              title: 'маленький'
              text: 'маленький'
              free: false
            }
            {
              value: 'large'
              title: 'большой'
              text: 'большой'
              free: false
            }
          ]
        color:
          style: 'circlebtns'
          itemStyle: 'circlebtn'
          optionName: 'headercolor'
          stateName: 'designTlog-headerColor'
          value: 'white'
          items: [
            {
              value: 'white'
              title: 'Белый'
              text: 'Белый'
              free: true
            }
            {
              value: 'black'
              title: 'Чёрный'
              text: 'Чёрный'
              free: true
            }
            {
              value: 'custom'
              title: 'Любой'
              text: 'Любой'
              free: false
            }
            {
              value: 'shamrock'
              title: 'Трилистник'
              text: 'Трилистник'
              free: false
            }
            {
              value: 'cinnabar'
              title: 'Синнобар'
              text: 'Синнобар'
              free: false
            }
            {
              value: 'bluegray'
              title: 'Серо-голубой'
              text: 'Серо-голубой'
              free: false
            }
            {
              value: 'madison'
              title: 'Мэдисон'
              text: 'Мэдисон'
              free: false
            }
          ]
      background:
        color:
          style: 'circlebtns'
          itemStyle: 'circlebtn'
          optionName: 'bgcolor'
          stateName: 'designTlog-bgColor'
          value: 'white'
          items: [
            {
              value: 'white'
              title: 'Белый'
              text: 'Белый'
              free: true
            }
            {
              value: 'black'
              title: 'Чёрный'
              text: 'Чёрный'
              free: true
            }
            {
              value: 'custom'
              title: 'Любой'
              text: 'Любой'
              free: false
            }

            {
              value: 'cinnabar'
              title: 'Синнобар'
              text: 'Синнобар'
              free: false
            }
            {
              value: 'silversand'
              title: 'Серебряный песок'
              text: 'Серебряный песок'
              free: false
            }
            {
              value: 'bluegray'
              title: 'Серо-голубой'
              text: 'Серо-голубой'
              free: false
            }
          ]
        image:
          optionName: 'bgimage'
          stateName: 'designTlog-bgImage'
          value: 'http://taaasty.com/assets/backgrounds/fb/e2/1881243_20140806230841_91475.jpg'
          enabled: false
          free: true
        alignment:
          style: 'dotted'
          optionName: 'bgalignment'
          stateName: 'designTlog-bgAlignment'
          value: 'justify'
          free: true
          items: [
            {
              value: 'justify'
              title: 'по ширине'
              text: 'по ширине'
            }
            {
              value: 'center'
              title: 'по центру'
              text: 'по центру'
            }
          ]
      feed:
        bgcolor:
          style: 'circlebtns'
          itemStyle: 'circlebtn'
          optionName: 'feedbgcolor'
          stateName: 'designTlog-feedBgColor'
          value: 'white'
          items: [
            {
              value: 'white'
              title: 'Белый'
              text: 'Белый'
              free: true
            }
            {
              value: 'black'
              title: 'Чёрный'
              text: 'Чёрный'
              free: true
            }
            {
              value: 'custom'
              title: 'Любой'
              text: 'Любой'
              free: false
            }
            {
              value: 'cinnabar'
              title: 'Синнобар'
              text: 'Синнобар'
              free: false
            }
            {
              value: 'silversand'
              title: 'Серебряный песок'
              text: 'Серебряный песок'
              free: false
            }
            {
              value: 'bluegray'
              title: 'Серо-голубой'
              text: 'Серо-голубой'
              free: false
            }
          ]
        font:
          style: 'font'
          optionName: 'feedfont'
          stateName: 'designTlog-feedFont'
          value: 'ptsans'
          items: [
            {
              value: 'ptsans'
              title: 'PT Sans'
              text: 'Aa'
              free: true
            }
            {
              value: 'ptserif'
              title: 'PT Serif'
              text: 'Aa'
              free: true
            }
            {
              value: 'roboto'
              title: 'Roboto'
              text: 'Aa'
              free: false
            }
            {
              value: 'lora'
              title: 'Lora'
              text: 'Aa'
              free: false
            }
            {
              value: 'philosopher'
              title: 'Philosopher'
              text: 'Aa'
              free: false
            }
            {
              value: 'ptmono'
              title: 'PT Mono'
              text: 'Aa'
              free: false
            }
            {
              value: 'berenisadfpro'
              title: 'Berenis ADF Pro'
              text: 'Aa'
              free: false
            }
            {
              value: 'djserif'
              title: 'DejaVu Serif Condensed'
              text: 'Aa'
              free: false
            }
            {
              value: 'heuristica'
              title: 'Heuristica'
              text: 'Aa'
              free: false
            }
            {
              value: 'permian'
              title: 'Permian Slab Serif'
              text: 'Aa'
              free: false
            }
            {
              value: 'robotoslab'
              title: 'Roboto Slab'
              text: 'Aa'
              free: false
            }
            {
              value: 'clearsans'
              title: 'Clear Sans'
              text: 'Aa'
              free: false
            }
          ]

module.exports = DesignSettingsMixin