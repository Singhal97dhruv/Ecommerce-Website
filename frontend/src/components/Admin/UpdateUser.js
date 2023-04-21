import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
    
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate =useNavigate();
    const {loading,error,user}=useSelector((state)=>state.userDetails);
    const {loading: updateLoading,error: updateError,isUpdated}=useSelector((state)=>state.profile);

    const[name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");

    
    const {id}=useParams();
    
    useEffect(()=>{

        if(!user || user._id!== id){
            dispatch(getUserDetails(id))
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("User Updated Successfully");
            navigate('/admin/users');
            dispatch({type: UPDATE_USER_RESET})
        }
    },[dispatch,alert,error,id,navigate,isUpdated,updateError,user])

    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(id,myForm));
    }

  return (
    <Fragment>
      <MetaData title="Update User"/>
      <div className="dashboard">
        <SideBar/>
        <div className="newProductContainer">
            {loading?<Loader/>:<form action="" className="createProductForm" encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}>
                <h1>Update User</h1>
                <div>
                    <PersonIcon/>
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <MailOutlineIcon/>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                
                <div>
                    <VerifiedUserIcon/>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Choose Role</option>
                        <option value="admin">admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
             
               
               
                <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading?true:false || role===""? true: false}
                >
                    Update
                </Button>


            </form>}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser
