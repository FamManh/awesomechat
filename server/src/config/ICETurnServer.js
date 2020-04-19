const request = require('request')

let getICETurnServer = () => {
    return new Promise(async (resolve, reject)=>{
        // get ICE STUN and TURN list
        let o = {
            format: "urls"
        }
        let bodyString = JSON.stringify(o);
        const host = ""
        const path = ""
        let options = {
            url: `https://${host}${path}`,
            method: 'PUT',
            headers: {
                
            }
        }

        // call request to get ICE list of TURN server
        request(options, (error, res, body)=>{
            if(error){
                console.log("Error when get ICE list: " + error)
                return reject(error);
            }
            let bodyJson = JSON.parse(body)
            resolve(bodyJson);

        })
    })
}