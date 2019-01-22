const app = new Vue({
    el: "#app",
    data() {
        return {
            posts: [],
            post: {
                title: "",
                body: "",
                author: ""
            },
            editMode: false,
            status: false,
            message: "",
            alertType: "",
            url: "/api/posts/"
        };
    },
    methods: {
        // Add Or Edit Post
        addPost() {
            if (this.validate()) {
                if (!this.editMode) {
                    // Post the data to the server
                    fetch(`${this.url}/add`, {
                            method: "post",
                            body: JSON.stringify(this.post),
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            // Success alert
                            if (data.success) {
                                this.post.title = "";
                                this.post.body = "";
                                this.post.author = "";
                                this.getAlerts(data.message, "success");
                                this.posts.push(data.post);
                            } else {
                                this.getAlerts(data.message, "danger");
                            }
                        })
                        .catch(err =>
                            this.getAlerts(
                                "Something went wrong. Please try again later.",
                                "danger"
                            )
                        );
                } else {
                    fetch(`${this.url}`, {
                            method: 'put',
                            body: JSON.stringify(this.post),
                            headers: {
                                'content-type': 'application/json'
                            }
                        }).then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                this.getAlerts(data.message, "success");
                                this.loadPosts()
                                this.post.title = ''
                                this.post.body = ''
                                this.post._id = ''
                                this.post.author = ''
                                this.editMode = false
                            } else {
                                this.getAlerts(data.message, "danger");
                            }
                        })
                        .catch(err => console.log(err))
                }
            } else {
                this.getAlerts('Please fill in all the fields.', "danger");
                return
            }
        },
        // Validation
        validate() {
            let {
                title,
                body,
                author
            } = this.post;
            if (title === "" || body === "" || author === "") {
                this.getAlerts("Please fllin all the details.", "danger");
                return false;
            }
            return true;
        },
        // Delete Post
        deletePost(id, index) {
            if (confirm("Are you sure to delete this Article?")) {
                fetch(`api/posts/${id}`, {
                        method: "delete"
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            this.getAlerts(data.message, "success");
                            this.posts.splice(index, 1);
                        } else {
                            this.getAlerts(data.message, "danger");
                        }
                    })
                    .catch(err => {
                        this.getAlerts(
                            "Something went wrong. Please try again later.",
                            "danger"
                        );
                    });
            }
        },
        // Edit Post
        editPost(post) {
            this.post = post;
            this.editMode = true;
        },
        // Get all the posts from the Database
        loadPosts() {
            fetch(`${this.url}`)
                .then(res => res.json())
                .then(res => {
                    this.posts = res.posts;
                })
                .catch(err => console.log(err));
        },
        // Alerts
        getAlerts(message, className) {
            this.status = true;
            this.alertType = `alert alert-${className}`;
            this.message = message;
            setTimeout(() => {
                this.status = false;
                this.alertType = "";
                this.message = "";
            }, 5000);
        }
    },
    created() {
        this.loadPosts();
    }
});