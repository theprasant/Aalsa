const niceDate = (dt) => {
    return `${dt.toLocaleString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`.replace(/,/ig, ' ').replace(/\s/i, ' -');
  }
  
  const niceTime = (dt) => {
    return `${dt.toLocaleString("en-IN")}`.split(',')[1];
  }

  module.exports = {niceDate, niceTime}