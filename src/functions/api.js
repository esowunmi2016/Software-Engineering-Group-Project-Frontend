

export const login =(info)=>{
    return fetch(
        // 'http://localhost:8080/login', 
        'https://swe-backend.azurewebsites.net/', 
        {
            method:'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        )
        .then(response => response.text())
        .then((res) => {
                console.log(escape(res))
                if(res == "wrongPassword"){
                    info('Wrong Password')
                }else if(res == 'wrongEmail'){
                    info('Email Not Found')
                }else{
                    localStorage.setItem('synergyToken' , res)
                    info('loged in')
                }
            setloading(false)
        })
        .catch(error => console.log(error)) 
}