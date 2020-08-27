export default function(value){
    const date = new Date(value * 1000); // 因為一般 timestamp 取得的是秒數，但要帶入的是毫秒，所以要乘 1000
    return date.toLocaleDateString(); // "2019/1/14"
}