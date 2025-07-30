import './NotFound.scss';

const NotFound = () => {
  const handleNavigateToHome = ()=>{
     window.location.href="/dashboard";
  }
  return (
    <div className='not-found-container'>
      <div className="not-found-bg">
      </div>
      <div className="not-found-content-container">
        <div className='frame-svg'>
          <img src="/svg/not-found-frame.svg" alt="" />
        </div>
        <div onClick={handleNavigateToHome} className='not-found-action-button'>
          Back to home
        </div>
      </div>
    </div>
  );
};

export default NotFound;