let color = require('onecolor');

function color_check (colorstr){
  let regexp_hex = new RegExp('^(#)?([a-f0-9]{3}|[a-f0-9]{6})$', 'i'), //#fff , #abc123
      regexp_rgb = new RegExp('^(rgb)\\(([0-9]+),([0-9]+),([0-9]+)\\)$', 'i'), //rgb(255, 255, 255) - red < 256, green < 256, blue < 256
      regexp_hsl = new RegExp('^(hsl)\\(([0-9]+),([0-9]+)(%),([0-9]+)(%)\\)$', 'i'), //hsl(0, 95%, 50%)
      str_transparent='transparent',
      hex, rgb, hsl;

  if(colorstr){
    colorstr = unescape(colorstr).toLowerCase().trim().replace(/(\s|%20)/g, '');
    console.log(colorstr);

    //check for HEX string
    if(hex = colorstr.match(regexp_hex)){
      if(hex[2].length == 3) return '#' + [].map.call(hex[2], (char) => char + char).join('');
      else return '#' + hex[2];
    //check rgb and return HEX
    }else if(rgb = colorstr.match(regexp_rgb)){
      let red=parseInt(rgb[2]),
          green=parseInt(rgb[3]),
          blue=parseInt(rgb[4]);
      if(red <= 255 && green <= 255 && blue <= 255){
        return '#' + [].map.call([red, green, blue], (p) => { let r=Number(p).toString(16); return r.length>1?r:'0'+r;  } ).join('');
      }else{
        throw new TypeError('Expected three numbers below 256');
      }
    }else if(hsl = colorstr.match(regexp_hsl)){
      console.log(hsl[0]);
      let hue=parseInt(hsl[2]),
          saturation=parseInt(hsl[3]),
          lightness =parseInt(hsl[5]);

      if(hue<=360 && saturation <= 100 && lightness <= 100){
        return color(hsl[0]).hex();
      }else{
        throw new TypeError('Expected hue below 360, or saturation below 100%, or lightness below 100%');
      }

    }else if(typeof colorstr === 'string' && colorstr === 'transparent'){
      return "#ffffff";
    }else{
      return false;
    }
  }else{
    return false;
  }
}

module.exports = color_check;
