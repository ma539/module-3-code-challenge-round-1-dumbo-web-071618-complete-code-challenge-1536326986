document.addEventListener('DOMContentLoaded', function() {
  const imageInsert = document.querySelector('#image')
  const imageName = document.querySelector('#name')
  const imageLikes = document.querySelector('#likes')
  const imageCardContent = document.querySelector('#image_card')
  const imageComments = document.querySelector('#comments')
  const likeButton = document.querySelector('#like_button')
  const commentForm = document.querySelector('#comment_form')

  const imageId = 80 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
    imageInsert.setAttribute('src', data.url)
    imageName.innerText = data.name
    imageLikes.innerText = data.like_count
    imageComments.innerHTML += (`<li>${data.comments[0].content}</li>`)
  })

  likeButton.addEventListener('click', (event) => {
    let likeCount = parseInt(imageLikes.innerText)
    likeCount = likeCount + 1
    imageLikes.innerText = likeCount

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  })
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event.target)
    imageComments.innerHTML += (`<li>${event.target.value}</li>`)
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        {
          image_id: 80,
          content: event.target.value
        }
      })
    })
  })

})

// function(imageCard) {
//   let imageCard = document.createElement
// }
function commentList(comment) {
  let commentList = document.createElement('li')
  commentList.innerText = comment.content
  return commentList
}
