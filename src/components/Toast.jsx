import { Toaster } from 'react-hot-toast'

function Toast ()  {
  return (
    <Toaster
      position= 'bottom-left'
      toastOptions={{
        duration: 10000,
        success: {
          style: {
            background: '#21ba45',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#21ba45',
          }
        },
        error: {
          style: {
            background: '#c74a4a',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#c74a4a',
          }
        }
      }}
    />      
  )
}

export default Toast
