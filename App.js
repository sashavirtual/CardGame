function Cards({ moves, setMoves }) {
  let arr = [
    {
      id: '!',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3338/3338866.png',
    },
    {
      id: '!',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3338/3338866.png',
    },
    {
      id: '@',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3338/3338890.png',
    },
    {
      id: '@',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3338/3338890.png',
    },
    {
      id: '#',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3204/3204747.png',
    },
    {
      id: '#',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/3204/3204747.png',
    },
    {
      id: '$',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/419/419952.png',
    },
    {
      id: '$',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/419/419952.png',
    },
    {
      id: '%',
      stat: '',
      src: 'https://img.icons8.com/office/344/key.png',
    },
    {
      id: '%',
      stat: '',
      src: 'https://img.icons8.com/office/344/key.png',
    },
    {
      id: '^',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/419/419965.png',
    },
    {
      id: '^',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/419/419965.png',
    },
    {
      id: '&',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7206/7206459.png',
    },
    {
      id: '&',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7206/7206459.png',
    },
    {
      id: '*',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7209/7209048.png',
    },
    {
      id: '*',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7209/7209048.png',
    },
    {
      id: '+',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/824/824239.png',
    },
    {
      id: '+',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/824/824239.png',
    },
    {
      id: '=',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7206/7206619.png',
    },
    {
      id: '=',
      stat: '',
      src: 'https://cdn-icons-png.flaticon.com/512/7206/7206619.png',
    },
  ];
  const [items, setItems] = React.useState(arr.sort(() => Math.random() - 0.5));
  const [prev, setPrev] = React.useState(-1);
  const [count, setCount] = React.useState(1);
  const [success, setSuccess] = React.useState(1);
  const [array, setArray] = React.useState([]);

  function check(current) {
    if (items[current].id == items[prev].id) {
      items[current].stat = 'correct';
      items[prev].stat = 'correct';
      document.getElementById(current + 'id').style.opacity = '0';
      document.getElementById(prev + 'id').style.opacity = '0';
      array.push(current + 'id');
      array.push(prev + 'id');
      console.log(array);
      document.getElementById(current + 'id').disabled = true;
      document.getElementById(prev + 'id').disabled = true;
      setItems([...items]);
      setPrev(-1);
      setSuccess((i) => i + 1);
      console.log('SUCCEESSFUL PAIRS: ' + success);
      if (success === 10) {
        setMoves(
          'Congratulations! You resolved this puzzle in ' +
            Math.floor(count / 2) +
            ' attempts!'
        );
      }
    } else {
      items[current].stat = 'wrong';
      items[prev].stat = 'wrong';
      let newArr = [];
      for (let i = 0; i < 20; i++) {
        if (document.getElementById(i + 'id').disabled === true) {
          newArr.push(i + 'id');
        } else {
          document.getElementById(i + 'id').disabled = true;
        }
      }
      setItems([...items]);

      setTimeout(() => {
        items[current].stat = '';
        items[prev].stat = '';
        setItems([...items]);
        setPrev(-1);
        for (let i = 0; i < 20; i++) {
          if (newArr[0] === i + 'id') {
            newArr.shift();
          } else {
            document.getElementById(i + 'id').disabled = false;
          }
        }
      }, 900);
    }
  }
  function handleClick(id) {
    setCount((current) => current + 1);
    if (document.getElementById(id + 'id').disabled === true) {
      setCount((i) => i - 1);
    } else if (id == prev) {
      setCount((i) => i - 1);
    } else if (prev === -1) {
      items[id].stat = 'active';
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }

    setItems([...items]);
  }
  const playAgain = () => {
    setItems(arr.sort(() => Math.random() - 0.5));
    array.map((item) => {
      document.getElementById(item).style.opacity = '1';
      document.getElementById(item).style.cursor = 'pointer';
      document.getElementById(item).disabled = false;
    });
    setMoves('');
    setCount(0);
    setSuccess(1);
  };
  return (
    <div className='container'>
      {items.map((item, index) => (
        <Card
          className='game'
          src={item.src}
          id={index}
          handleClick={handleClick}
          key={index}
          item={item}
        />
      ))}
      <button onClick={playAgain} className='playAgain'>
        Restart
      </button>
    </div>
  );
}
function Card({ item, id, src, handleClick }) {
  const itemClass = item.stat ? ' active ' + item.stat : '';
  return (
    <div
      id={id + 'id'}
      className={'card' + itemClass}
      onClick={() => handleClick(id)}>
      {/* <p className="text">{item.id}</p> */}
      <img className='text' src={src} />
    </div>
  );
}
const App = () => {
  const [moves, setMoves] = React.useState('');

  return (
    <div className='app'>
      <h1> Memory card game</h1>
      <div>
        <Cards moves={moves} setMoves={setMoves} />
      </div>
      <div>
        <h1 className='congrats'>{moves}</h1>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
