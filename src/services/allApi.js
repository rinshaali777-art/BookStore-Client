import apiService from "../api/apiService"


//register api
export const registerAPI=async(userData)=>{
    return await apiService('POST','/register',userData)
}

// login api
export const loginAPI=async(userData)=>{
    return await apiService('POST','/login',userData)
}

// google login api
export const googleLoginAPI=async(userData)=>{
    return await apiService('POST','/google-login',userData)
}


// user profile update api
export const userUpdateAPI=async(userId, userData)=>{
    return await apiService('PUT',`/user/edit/${userId}`,userData)
}

// add book api
export const addBookApi=async(bookDetails)=>{
    return await apiService('POST','/add-book',bookDetails)
}

//homepage books api
export const homePageBooksApi=async()=>{
    return await apiService('GET','/homebooks')
}

//get books api
export const getBooksApi=async(searchKey)=>{
    return await apiService('GET',`/all-books?search=${searchKey}`,{})
}

//get user books api
export const getUserBooksApi=async()=>{
    return await apiService('GET','/user-books',{})
}

//get user bought books api
export const getUserBoughtBooksApi=async()=>{
    return await apiService('GET','/bought-books',{})
}

// single book 
export const getSingleBooksApi=async(id)=>{
    return await apiService('GET',`/single-book/${id}`,{})
}

//remove book
export const removeBookApi=async(id)=>{
    return await apiService('DELETE',`/remove-book/${id}`,{})
}

//paynment api
export const paymentAPI=async(id)=>{
    return await apiService('GET',`/make-payment/${id}`,{})
}

// verify payment api 
export const verifyPaymentAPI=async(reqBody)=>{
    return await apiService('POST','/verify-payment',reqBody)
}

// /get all books api
export const BooksApi=async()=>{
    return await apiService('GET','/books',{})
}


// admin edit api
export const adminEditAPI=async(adminId, adminData)=>{
    return await apiService('PUT',`/admin/edit/${adminId}`,adminData)
}

//book status update api
export const editBookStatusApi=async(id)=>{
    return await apiService('PUT',`/book-update/${id}`,{})
}

//get all users for admin
export const getUserApi = async()=>{
    return await apiService('GET','/all-users',{})
}

//get book abstract 
export const getAbstractApi = async(title)=>{
    return await apiService('POST','/books-ai',{title})
}