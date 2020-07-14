/*
 * Best case: 
 * node index.js 123456
 *
 * Worse case:
 * node index.js !!!!!!55
 *
 */

const fs  = require('fs');

const rr = fs.createReadStream('./xato-net-10-million-passwords.txt');
function checkCommonUsedPwd(newPwd) {
  return new Promise((resolve, reject) => {
    rr.on('data', (curPwd) => {
      if (curPwd.toString('utf-8').includes(newPwd)) {
        rr.destroy()
        resolve(true)
      }
    });

    rr.on('end', () => {
      resolve(false)
    });

    rr.on('error', (err) => {
      reject(err)
    });
  })
}

(async function() {
  const pwd = process.argv[2];
  const result = await checkCommonUsedPwd(pwd)
  console.log(result)
})();
