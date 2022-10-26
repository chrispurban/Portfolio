module.exports = {
  'whitelist': (req, cb) => {
    let options;
    if (process.env.HOSTS.split(",").some(z=>z==req.header('Origin')))
      {options = {origin:true}}
    else
      {options = {origin:false}}
    cb(null, options);
    //optimization move options into callback
  }
}
