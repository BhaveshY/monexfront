const useAPI = (url, callOptions) => {
    
    const call = (callData)=>{
        let _options = {}
        if(callData){
            _options.method = 'POST'
            _options.headers =  { 'Content-Type': 'application/json' }
            _options.body =  JSON.stringify(callData)
        }
        let options = Object.assign({}, _options, callOptions);
        
        return fetch(url,options).then(res => {
            if (!res.ok) throw Error('Cannot fetch data.')
            return res.json()
        }).then((data) => {
            console.log(data)
          return data
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch Aborted')
            } else {
                
            }
        })
    }

    return { call }
}

export default useAPI