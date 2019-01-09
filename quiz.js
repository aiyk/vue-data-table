let Fernet = require('./fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcEhjQCWxue890btLF4EcMv2tbJrsFJdfeifvzqZQT0lYtuZALugaMo1cBRzSI-GfI3JXi-j0PbyYt8ZhPnjcz55THRgElCCtGoTSKWRnqmeTpLHKWLCJdMpICdXfrlVb4tyEWedGMg4CkkuiDJe33Dqn2jmmknQxia2ZxmbHXOUzgP69VaoIz_Ae5cWznDQ6YGH_T'
let token = new Fernet.Token({ secret: secret, token: message, ttl: 0 })
const decoded = token.decode()
console.log(decoded);