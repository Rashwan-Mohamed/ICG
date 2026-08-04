import React from 'react';
import {Link} from 'react-router-dom';
import {useGlobalContext} from '../context';

function Footer({className}) {
    const d = new Date();
    let year = d.getFullYear();
    const {lang} = useGlobalContext();

    return (
        <footer className={`${className ? className : 'undefined'}`}>
            <div className="footerWrapper">
                <div className="Lino"></div>
                <h2 className="LEGO">PRJ-X</h2>
                <p dir={lang ? 'rtl' : 'lrt'} className="audioSpecialist">
                    {lang
                        ? 'PRJ-X هي وجهتك النهائية لشراء مشغلات البيانات. نحن مجموعة متحمسة من الخبراء ملتزمة بمساعدتك في العثور على أفضل جهاز عرض لاحتياجاتك. تفضل بزيارة صالة العرض الخاصة بنا عبر الإنترنت - لدينا مجموعة واسعة من الطرازات والميزات التي تناسب أي ميزانية وتفضيل.'
                        : 'PRJ-X is your ultimate destination for data show projectors. We’re a passionate group of experts who are dedicated to helping you find the best projector for your needs. Come and check out our online showroom - we have a wide range of models and features to suit any budget and preference.'}
                </p>

                <address dir={lang ? 'rtl' : 'lrt'} className="dresso">

                    {lang ? 'حلوان القاهرة' : 'Helwan Cairo'}
                    <br/>
                    <a href="tel:+201028431234">01028431234</a>
                </address>

                <ul className="cats">
                    <li>
                        <Link style={{
                            fontSize: lang
                                ? '16px'
                                : '13px',
                        }} to={'/'}>
                            {lang ? 'الصفحة الرئيسية' : 'Home'}
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{fontSize: lang ? '16px' : '13px'}}
                            to={'/projectors'}
                        >
                            {lang ? 'المنتجات' : 'Products'}
                        </Link>
                    </li>
                    <li>
                        <Link style={{
                            fontSize: lang
                                ? '16px'
                                : '13px',
                        }} to={'/speakers'}>
                            {lang ? 'من نحن' : 'About Us'}
                        </Link>
                    </li>
                </ul>
                <div className="links">
                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/people/PRJ-X/61589563948384/">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
                                fill="#FFF"
                                fillRule="nonzero"
                            />
                        </svg>
                        {' '}
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
