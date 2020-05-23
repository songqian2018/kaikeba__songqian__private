import axios from 'axios';

// 模拟异步数据调用
// export function getCourses() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve([{name: '大数据', price: 100}, {name: '人工智能', price: 200}]);
//         }, 2000);
//     })
// }


export function getCourses() {
    return axios.get('/api/courses').then(res => res.data)
}