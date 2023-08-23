import React, { useState } from 'react'

const UpdateStudent = ( {student} ) => {
    const [ studentId,setStudentId]=useState( student.Id)

    console.log(student)
  return (
    <div>

    </div>
  )
}

export default UpdateStudent