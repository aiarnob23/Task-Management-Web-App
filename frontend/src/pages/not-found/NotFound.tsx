import './NotFound.scss';


const NotFound = () => {
  return (
    <div className='not-found-container'>
      <div className="not-found-bg">
        <img className='not-found-bg-svg' src="/svg/roadmap-design.svg" alt="" />
      </div>
      <div className="not-found-content-container">
        <div className='frame-svg'>
          <img src="/svg/not-found-frame.svg" alt="" />
        </div>
        <div className='not-found-action-button'>
          Back to home
        </div>
      </div>
    </div>
  );
};

export default NotFound;