import React, { useState, useEffect } from "react";
import './Newheader.less'
import LOGO from '../../images/crm.png';

type PropsType = {
  // data: any
}
const NewHeader = (props: PropsType) => {
  return (
    <div className={'newheader t-FBH '}>
      <div className="logo t-FBH t-FB1">
        <img src={LOGO} alt="" />
        <span className="yc-crm ">洋洋de意</span>
        <span className="split-line"></span>
        <span
          className={`title-nav `}
          onClick={() => {
            document.location.hash = '/';
          }}
        >
          首页
        </span>
      </div>
    </div>
  )
}

export default NewHeader;