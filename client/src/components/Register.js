/**
 * React
 */
import React from 'react';

/**
 * Axios
 */
import axios from 'axios';

/**
 * Register Component
 */
class Register extends React.Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
        //لمنع حدوث اخطاء عند تعبئة الحقول والتعديل عليها 
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //جعل القيم الابتدائية فارغه في بداية فتح واجهة التطبيق 
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        };
    }

    // تغير مدخلات الاسم عند التعديل عليها بشكل مباشر
    onChangeName(e) {
        this.setState({
            name: e.target.value,
            // عندما تكون هنالك رساله خطأ وعند بداية تعبئة اي من الحقول رسال الخطأ تختفي
            error: ''
        });
    }

    // تغير مدخلات الايميل عند التعديل عليها بشكل مباشر
    onChangeEmail(e) {
        //هو تابع يقوم بالتعديل على المتغيرات التي بداخله setState
        this.setState({
            email: e.target.value,
            // عندما تكون هنالك رساله خطأ وعند بداية تعبئة اي من الحقول رسال الخطأ تختفي
            error: ''
        });
    }

    // تغير مدخلات كلمة المرور عند التعديل عليها بشكل مباشر
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            // عندما تكون هنالك رساله خطأ وعند بداية تعبئة اي من الحقول رسال الخطأ تختفي
            error: ''
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        // ارسال المعلومات المدخله الى مسار انشاء جديد في طرف الخادم
        axios.post('/api/register', data)

            .then(res => {
                //في حال نجاح الطلب يرسل الخام رمز توكين للمتصفح 
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token };
                // توجيه المستخدم للنافذة الرئيسية عند التسجيل بنجاح
                this.props.history.push('/');
            })
            // في حال وجود خطأ
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }
    // في حال حدوث خطأ يظهر الرساله في بلوك وفي حال عدم وجود الخطأ يكون هذا البلوك فارغ 
    renderError() {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className="column column-50 column-offset-25">
                <h4>إنشاء حساب جديد</h4>
                <hr />
                {/* مكان ظهور رسالة الخطأ  */}
                {this.renderError()}
                <form onSubmit={this.onSubmit}>
                    <label>الاسم</label>
                    <input type="text" value={this.state.name} onChange={this.onChangeName} />
                    <label>البريد الالكتروني</label>
                    <input type="email" value={this.state.email} onChange={this.onChangeEmail} />
                    <label>كلمة المرور</label>
                    <input type="password" value={this.state.password} onChange={this.onChangePassword} />
                    <input className="button-primary" type="submit" value="التسجيل" />
                </form>
            </div>
        );
    }
}

export default Register