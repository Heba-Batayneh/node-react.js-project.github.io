/**
 * React
 */
import React from 'react';

/**
 * React Router Dom
 */
import { withRouter, Link } from 'react-router-dom';

/**
 * Axios
 */
import axios from 'axios';

/**
 * Header Component
 */
class Header extends React.Component{

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = {'Authorization': ''};
        this.props.history.push('/');
    }

    render(){
        //في حال كان المستخدم مسجل 
        if(localStorage.getItem('token')){
            return(
                <div className="navbar">
                    <ul>
                        <li><Link to="/">الرئيسية</Link></li>
                        <li><Link to="/post/create">إنشاء تدوينة</Link></li>
                        <li><a href="#logout" onClick={this.logout}>تسجيل الخروج</a></li>
                    </ul>
                </div>
            );
        }
        //في حال كان المستخدم غير مسجل 
        return(
            <div className="navbar">
                <ul>
                    <li><Link to="/">الرئيسية</Link></li>
                    <li><Link to="/login">تسجيل الدخول</Link></li>
                    <li><Link to="/register">التسجيل</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header)