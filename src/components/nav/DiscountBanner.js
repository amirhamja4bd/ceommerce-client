import React from 'react';
import '../../assets/css/discount.css'
const DiscountBanner = () => {
    return (
        <div>
            <div id="slideit">
                {/*  Open/close buttons --> */}
                <input id="open-item" name="mini-cal" type="radio" />
                <input id="close-item" name="mini-cal" type="radio" checked="checked" />
                {/* <!-- Open label --> */}
                <label for="open-item" class="open">Discount</label>
                <section>
                    {/* <!-- Close label --> */}
                    <label for="close-item" class="close">&times;</label>
                    {/* <!-- Month and Year title --> */}
                    <div class="date">
                    <span class="day">18.</span>
                    <span class="month">January</span>
                    <span class="year">@ 2023</span>
                    </div>
                    <div class="content">
                    <div class="title">Special discount <span>-30%</span></div>
                    <p class="info">Don't miss out our new <span>special discount</span> for all new and existing users.</p>
                    <a class="get" href="#">- Get it now -</a>
                    </div>
                </section>
            </div> 
        </div>
    );
};

export default DiscountBanner;