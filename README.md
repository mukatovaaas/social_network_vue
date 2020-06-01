# social_network

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<br>
            path: '/',
            component: Home,
            Home page
<br>
            path: '/dashboard',
            component: Dashboard,
            List request user posts
<br>
            path: '/authenticate',
            component: Authenticate,
            Login/Sign up view
<br>
            path: '/followers',
            component: Followers,
            List followers
<br>
            path: '/following',
            component: Following,
            List following users
<br>
            path: '/posts/:id',
            component: UserPosts,
            List user[id] posts
<br>
            path: '/comments/:id',
            component: PostDetails,
            list comments post[id]
<br>
            path: '/messages',
            component: Messages,
            list messages of request user
<br>    
            path: '/messages/:id',
            component: UserMessages,
            list messages of request user and user[id]
<br>
            path: '/search/',
            component: UserSearch,
            search user by username          
