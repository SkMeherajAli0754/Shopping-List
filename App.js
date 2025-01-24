
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [food , setFood] = useState('');
  const [shoppingList , setShoppingList] = useState([]);
  const [bucketList , setBucketList] = useState([]);


  const handleInput=(e)=>{
    console.log(e.target.value);
    setFood(e.target.value);
  }
  const fetchItem = async (food)=>{
    const url = `https://api.frontendeval.com/fake/food/${food}`
    const result = await fetch(url);
    const data = await result.json();
    // console.log(data); 
    setShoppingList(data);
  }
  console.log(shoppingList);
  useEffect(()=>{
    if(food.length >= 2){
      //make api call
    fetchItem(food);
    }
  },[food])
  const handleProduct=(e)=>{
    const idx = (e.target.getAttribute('data-id'));
   if(idx){
    const obj = {
      id : Date.now(),
      data:shoppingList[idx],
      isDone : false
    }
    const copyBucketList = [...bucketList]
    copyBucketList.push(obj);
    setBucketList(copyBucketList);
   }
   setFood('');
  }
  console.log(bucketList);
  const handleClick=(id)=>{
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item)=>{
      if(item.id === id){
        item.isDone = !item.isDone
      }
      return item;
    })
    setBucketList(newBucketList);
  }
  const handleDel=(id)=>{
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item)=> id !== item.id)
    setBucketList(newList);
  }
  return (
    <div className="App"> 
    <h1>Shopping List</h1>
      <div>
        <input 
        type="text"
        placeholder='add item'
        value={food}
        onChange={handleInput}
        />
      </div>

     {
      food.length >= 2 ? (
        <div className='shopping-list' onClick={handleProduct}>
        {
          shoppingList.map((item ,  index )=>{
            return (
              <div className="product"
              data-id = {index}
              >
                {item}
              </div>
            )
          })
        }
      </div>
      ) : null
     }

      <div className='bucket-list'>
        {
          bucketList.map((item)=>{
            return (
             <div className='shopping-item'>
              <button
              onClick={()=>handleClick(item.id)}
              >✓</button>
              <div
              className={item.isDone ? 'strike' : ''}
              >{item.data}</div>
              <button onClick={()=>handleDel(item.id)}>X</button>
             </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
