import React from 'react'

const ToastMessage = () => {
  return (

      <div aria-live="polite" aria-atomic="true" style={{position: "relative"}}>

  <div style={{position: "absolute", top: 0, right: 0}}>


    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">

        <strong class="mr-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        See? Just like this.
      </div>
    </div>

  </div>
</div>

  )
}

export default ToastMessage
