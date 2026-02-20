# vue3-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 생명주기
//돔에 생성되기 전,,? 마운트가 되기 전에 setup안에 있는 것들 부터 쑥 읽고 실행된다.
onBeforeMount(() => {
    console.log(document.querySelector('#dom'));
});

//마운튿되고나서 실행
onMounted(() => {
    console.log('onBeforeUpdate');
});

onBeforeUpdate(() => {
    console.log(document.querySelector('#dom'));
});

onUpdated(() => {
    console.log('onUpdated');
});

onBeforeUnmount(() => {
    console.log('onBeforeUnmount');
});

//컴포넌트를 빠져나갈때 메모리 정리하기 위해 쓴다..
onUnmounted(() => {
    console.log('onUnmounted');
});

