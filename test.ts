const debounce = (fn: Function, delay: number) => {
	let timer: number;
	return function (...args: any) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

const thrl = (fn, delay) => {
	let timer: number | undefined;
	return function (...args) {
		if (!timer) {
			timer = setTimeout(() => {
				fn(...args);
        timer = undefined
			}, delay);
		}
	};
};


const a = thrl((...args)=>{
  console.log("a",...args)
},1000)
let b = debounce((...args: any)=>{
  a("b",...args)
},100)

setInterval(()=>{
  // a()
  // a()
  // a()
  a(123)
},1000)
