(function (){
    const newInput = document.querySelector('#firstinput');
    const ul = document.querySelector('.ul');
    const details = document.querySelector('.details');
    const itemsLefts = document.querySelector('#itemsleft');
    const active = document.querySelector('#active');
    const all = document.querySelector('#all');
    const completed = document.querySelector('#completed');
    const clearcompleted = document.querySelector('#clearcompleted');
    const fas = document.querySelector('.fas');

    let id  = function () { return 'querty'
    .split('')
    .sort(() => Math.random () -0.5)
    .join('') +('_') + Math.floor(Math.random()*100)};

    let switchcheck = false;
    let state = JSON.parse(localStorage.getItem('myTodo')) || [];

    function createUI(todos){
      ul.innerHTML = "";
      todos.forEach(todo => {
          var li = document.createElement('li');
          li.classList.add('list-items');

          var check = document.createElement('input');
          check.setAttribute('type', 'checkbox');
          check.setAttribute('data-id',todo.id);
          check.classList.add('secondinput')
          check.checked = todo.completed

          var newp = document.createElement('p');
          newp.setAttribute('data-id',todo.id);
          newp.classList.add('paran');
          newp.textContent = todo.text;

          var spa = document.createElement('button');
          spa.setAttribute('data-id',todo.id);
          spa.classList.add('bttn')
          spa.textContent = 'x';
          
          li.append(check, newp, spa);
          ul.append(li);

          spa.addEventListener('click',deletetodo);
          check.addEventListener('click',checkcount);
          newp.addEventListener('click',change);
          active.addEventListener('click',activeFunc);
          all.addEventListener('click',allFunc);
          completed.addEventListener('click',completeFunc);
          clearcompleted.addEventListener('click',clearCompleted);
          fas.addEventListener('click',selectAll);
      });
      itemsleft();
  }

    function addtodo(event){
        if(event.keyCode==13 && newInput.value){
          state.push({
            completed: false,
            text: newInput.value,
            id: id()
        })
        details.classList.add('details1');
          createUI(state);
          newInput.value ="";
          localStorage.setItem('myTodo',JSON.stringify(state));
        }
      }
      newInput.addEventListener('keyup', addtodo);
      createUI(state);

    function deletetodo(event){
      state = state.filter(todo => todo.id != event.target.dataset.id)
      createUI(state);
      localStorage.setItem('myTodo',JSON.stringify(state));
    }
   
    function checkcount(event){
      state = state.map(todo => {
        if(todo.id == event.target.dataset.id){
          todo.completed = !todo.completed
        }
        return todo 
        })
        createUI(state);
        localStorage.setItem('myTodo',JSON.stringify(state));
    }


    function itemsleft(){
      var lefts = state.filter(todo => todo.completed == false).length;
      if(lefts){
        itemsLefts.parentElement.parentElement.classList.add('details1')
        }
        else if (state == []){
          itemsLefts.parentElement.parentElement.classList.remove('details1');
        }
        return itemsLefts.innerText = lefts;
    }



    function activeFunc(){
      var state_active = state.filter(todo => todo.completed == false)
      createUI(state_active);
    }



    function allFunc(){
      createUI(state);
    }


    function completeFunc(){
      var state_inactive = state.filter(todo => todo.completed == true)
      createUI(state_inactive);
      localStorage.setItem('myTodo',JSON.stringify(state));
    }

    function clearCompleted(){
      state = state.filter(todo => todo.completed == false)
      createUI(state);
      localStorage.setItem('myTodo',JSON.stringify(state));
    }

    function change(d){
      d.target.contentEditable = true;
      if (d.keyCode==13){
        state.map(todo => {
          if(todo.id == d.target.dataset.id){
            todo.text = newp.textContent;
          }
        })
      }
    }

    function selectAll(event){
      if (switchcheck == false){
        state = state.map(todo => {
          todo.completed = true;
          return todo
        })}
        if (switchcheck){
          state = state.map(todo => {
            todo.completed = false;
            return todo })
          }
          switchcheck = !switchcheck;
          createUI(state);
          localStorage.setItem('myTodo',JSON.stringify(state));
        }
})();