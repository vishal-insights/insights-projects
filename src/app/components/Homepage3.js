import React from 'react'
import LaserFlow from '@/components/LaserFlow'

const Homepage3 = () => {
  return (
    <>
      <div className='bg-black'>
      
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.1}
          color="#4361EE"
        />

        <div style={{
          position: 'absolute',
          top: '246%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '86%',
          height: '50%',
          backgroundColor: '#060010',
          borderRadius: '20px',
          border: '2px solid #4361EE',
          display: 'flex',
          //   alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          zIndex: 6
        }}>
          {/* Your content here */}

          <div className="text-center my-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-shadow-fuchsia-100">
              Why Compliance Starts With Us
            </h1>
            <hr className="w-24 border-t-2 border-blue-600 mx-auto my-4" />
            <p className="text-lg text-shadow-fuchsia-200 font-medium mb-2">
              Led by Proprietor <span className="text-blue-600">CS Shailendra Dwivedi</span>, CS, LLB, BCom
            </p>
            <p className="text-shadow-fuchsia-100 text-base">
              We are one of Mumbai’s leading corporate legal firms with over 12 years of professional experience.
              Committed to excellence and client satisfaction, we provide expert guidance and reliable solutions
              to help your business stay fully compliant and thrive in today’s dynamic legal environment.
            </p>
            <div className=' text-orange-600'>

              <p className=" text-base">
                We believe that with individual client comes responsibility of providing personalised solutions and services to every client individually. Hence, we are focused on providing personalised solutions to our clients based on their legal need.
              </p>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Homepage3
