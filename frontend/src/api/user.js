import axios from 'axios';

export async function getUserData(id, name){
    try{ 
        let res = await axios.get('/api/user/data', {
            params: {
                id: id,
                name: name
            }
        })
        return res.data[0];
    } catch(err){
        console.log(err);
    }
}

export async function get(url, params){
    try{
        let res = await axios.get(url, {params: params})
        return res.data;
    } catch(e){
        console.log(e);
    }
}