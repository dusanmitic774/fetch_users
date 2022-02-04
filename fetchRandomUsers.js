function fetchUsers(pageNumber) {
  fetch(`https://randomuser.me/api?page=${pageNumber}&results=9&seed=abc`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results)
      const users = document.getElementById('users')
      users.innerHTML = ''
      let count = pageNumber * 9 - 8

      data.results.forEach((user) => {
        const singleUser = document.createElement('div')
        singleUser.classList.add('user')
        singleUser.setAttribute('data-aos', 'fade-in')

        users.appendChild(singleUser)

        const userNumber = document.createElement('div')
        userNumber.classList.add('user-number')
        userNumber.innerHTML = `<h3>User Nr. ${count}</h3>`
        singleUser.appendChild(userNumber)

        const userInfo = document.createElement('div')
        userInfo.classList.add('user-info')
        userInfo.innerHTML = `
        <p class="user-details">Name: ${user.name.first}</p>
        <p class="user-details">Email: ${user.email}</p>
        <p class="user-details">Phone Number: ${user.phone}</p>
        <p class="user-details">City: ${user.location.city}</p>
        <p class="user-details">Zipcode: ${user.location.postcode}</p>
        `
        singleUser.appendChild(userInfo)
        count++
      })
    })
}

function createLinkButton(text, classList) {
  linkObj = document.createElement('a')
  linkObj.innerHTML = text
  linkObj.href = '#'
  linkObj.classList.add(classList)
  return linkObj
}

function addEvent(element, event, pageNumber) {
  element.addEventListener(event, (event) => {
    createPagination(pageNumber)
    event.preventDefault()
    fetchUsers(pageNumber)
  })
}

function showLinksBeforeCurrent(currentPage) {
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 5) {
      continue
    }
    if (i == 0) {
      i = i + 1
    }
    let linkObj = createLinkButton(i, ['pagination-link'])
    if (currentPage == i) {
      linkObj.classList.add('active')
    }
    pagination.appendChild(linkObj)
    addEvent(linkObj, 'click', i)
  }
}

function createPagination(currentPage) {
  const pagination = document.getElementById('pagination')
  pagination.innerHTML = ''

  if (currentPage > 1) {
    let linkObj = createLinkButton('&laquo', ['pagination-before'])
    pagination.appendChild(linkObj)
    addEvent(linkObj, 'click', currentPage - 1)
  }

  if (currentPage > 2) {
    let linkObj = createLinkButton('first', ['pagination-link'])
    pagination.appendChild(linkObj)
    addEvent(linkObj, 'click', 1)
  }

  showLinksBeforeCurrent(currentPage)

  if (currentPage < 5) {
    let linkObj = createLinkButton('&raquo', ['pagination-after'])
    pagination.appendChild(linkObj)
    addEvent(linkObj, 'click', currentPage + 1)
  }
}

createPagination(1)
fetchUsers(1)
