import { forwardRef, useImperativeHandle } from 'react'

const SubscriptionManager = forwardRef((props, ref) => {
  const apply = () => {
    console.log('apply subscription')
  }
  // Expose apply function through the ref
  useImperativeHandle(ref, () => ({ apply: apply }))

  return (
    <>
      <div>toto</div>
    </>
  )
})

export default SubscriptionManager