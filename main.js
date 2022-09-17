//axios global
axios.defaults.headers.common['X-Auth-Token']=
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
function getTodos() {
    // axios({
    //     method:'get',
    //     url:'https://jsonplaceholder.typicode.com/todos',
    //     params:{
    //         _limit:5
    //     }

    // })

    //use this aur above both are same functionality
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then((res => showOutput(res)))
        .catch(error => console.error(error))
}

// POST REQUEST
function addTodo() {
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title:'New Todo',
    //         completed: false
    //     }

    // })
    axios.post('https://jsonplaceholder.typicode.com/todos', { title: 'New todo', completed: false })
        .then((res => showOutput(res)))
        .catch(error => console.error(error))
}

// PUT/PATCH REQUEST
function updateTodo() {
    axios({
        method: 'patch',  //we use put aur patch anyone
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        data: {
            title: 'Update New Todo',
            completed: true
        }
    })
    .then((res => showOutput(res)))
    .catch(error => console.error(error))


}

// DELETE REQUEST
function removeTodo() {
    axios({
        method: 'delete',  //nothing toshow in data
        url: 'https://jsonplaceholder.typicode.com/todos/1',
    })
    .then((res => showOutput(res)))
    .catch(error => console.error(error))


}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    // .then(res=>{
    //     console.log(res[0])
    //     console.log(res[1])
    //     showOutput(res[1])
    // })
    // .catch (error=>console.log(error));
    .then(axios.spread((todos,posts)=>showOutput(posts)))
    .catch((error=>console.log(error)))
}

// CUSTOM HEADERS
function customHeaders() {
    const config={
        headers:{
            'content-Type':'application/json',
            authorization:'sometoken'
        }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos', { title: 'New todo', completed: false },config)//use another parameter as a config
        .then((res => showOutput(res)))
        .catch(error => console.error(error))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const option={
        method:'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data:{
            title:'hello world'
        },
        transformResponse:axios.defaults.transformResponse.concat(data=>{
            data.title=data.title.toUpperCase();
            return data;
        })
    }
    axios(option).then((res)=>showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then((res)=>showOutput(res))
    .catch(error=>{
        if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            if(error.response.status===404){
                alert('Eror page not found')
            }

        }

    })
}

// CANCEL TOKEN
function cancelToken() {
    const source=axios.CancelToken.source()
    axios.get('https://jsonplaceholder.typicode.com/todoss',{cancelToken:source.token})
    .then((res)=>showOutput(res))
    .catch(thrown=>{
        if(axios.isCancel(thrown)){
            console.log('request cancelled',thrown.message)
        }
    })
    if(true){
        source.cancel('request cancelled')
    }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config=>{
        console.log(
            `${config.method.toUpperCase()} Request sent to ${config.url}at${new Date().getTime()}`
        )
        return config;
    },error=>{
        return Promise.reject(error);
    }
);

// AXIOS INSTANCES

//Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);