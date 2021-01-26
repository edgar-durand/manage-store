
const authHelper = () => localStorage.getItem("token") ? localStorage.getItem("token") :  null
export default authHelper