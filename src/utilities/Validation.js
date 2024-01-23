import React from 'react'

function Validation() {
    if (error) {
        return <div>Error occurred: {error}</div>;
      } else if (!data) {
        return (
          <Box sx={{ width: 100 }}>
            <Skeleton
              animation="wave"
              className="mx-5 my-3 mb-2"
              style={{ width: "200px", height: "150px" }}
            />
            <Skeleton
              animation="wave"
              className="mx-5 mb-2"
              style={{ width: "1500px", height: "60px" }}
            />
            <Skeleton
              animation="wave"
              className="mx-5 mb-2"
              style={{ width: "1500px", height: "60px" }}
            />
            <Skeleton
              animation="wave"
              className="mx-5 mb-0"
              style={{ width: "300px", height: "60px" }}
            />
            <Skeleton
              animation="wave"
              className="mx-5 mb-0"
              style={{ width: "300px", height: "250px" }}
            />
            <Skeleton
              animation="wave"
              className="mx-5 mt-0 "
              style={{ width: "80px", height: "60px" }}
            />
          </Box>
        );
      }
      else{
  return (
    <div>
        
    </div>
  )
      }
}


export default Validation