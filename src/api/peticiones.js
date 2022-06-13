


export const getListarReportes = async ()=>{
    let options ={
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    try{
        let res = await fetch(`http://tkambio.test/api/list-reports`,options),
        json = await res.json();

        if(!res.ok) throw {status: res.status , statusText: res.statusText};

        console.log(json);
        return json.data;

    }catch(err){
        console.log(err);
        return [];
    }
}