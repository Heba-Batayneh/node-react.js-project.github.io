/**
 * React
 */
import React from 'react';

/**
 * Axios
 */
import axios from 'axios';

/**
 * React Router Dom
*/
import { Link } from 'react-router-dom';

/**
 * Home Component
 */
class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            error: '',
            isLoading: true
        };
    }
//جلب التدوينات عند كل مره فتح الصفحة
    componentDidMount(){
        this.fetchPosts();
    }
// لجلب التدوينات
    fetchPosts(){
        axios.get('/api/posts')
        .then(res => {
            this.setState({
                posts: res.data,
                error: '',
                isLoading: false
            });
        })
        .catch(err => {
            this.setState({
                error: err.response.data.message,
                isLoading: false
            });
        });
    }

    render(){
        if(this.state.isLoading){
            return(<h4>الرجاء الإنتظار</h4>);
        }
        if(this.state.error){
            return(<blockquote>{this.state.error}</blockquote>);
        }
        // في حال لا يوجد بوستات
        if(this.state.posts.length < 1){
            return(<h4>لايوجد تدوينات</h4>);
        }
        // مثل فكرة جملة التكرار فور حيث يتم المرور على كل عناصر المصفوفه من خلاله map
        return this.state.posts.map(post => {
            return (
                <div key={post._id} className="row">
                    <div className="column">
                        <h4>{post.title}</h4>
                        <h6 className="title">{post.author.name}</h6>
                         {/* تحديد عدد احرف محتوى التدوينه */}
                        <p>{post.content.substr(0,120)}</p>
                        <Link to={"/post/view/" + post._id}>
                            <button className="button-primary button-outline">إقرأ المزيد</button>
                        </Link>
                        <hr/>
                    </div>
                </div>
            )
        })
    }
}

export default Home