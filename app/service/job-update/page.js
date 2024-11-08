import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const page = () => {
  return (
    <div>
        <h1> Job Update</h1>
        <div>
        <Input type="text" placeholder="JobNumber" />
        
        </div>
        <div><Button>Submit</Button></div>
    </div>
  )
}

export default page