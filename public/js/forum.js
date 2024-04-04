const fetchForumPosts = async () => {
    try {
        const response = await fetch("/api/forum/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch forum posts");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching forum posts:", error);
        throw error;
    }
};

const displayForumPosts = async () => {
    try {
        const forumPosts = await fetchForumPosts();
        const forumPostsContainer = document.querySelector(".forum-posts");
        
        if (forumPostsContainer) {
            forumPostsContainer.innerHTML = "";
            forumPosts.forEach(post => {
                const postElement = document.createElement("li");
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p><strong>Author:</strong> ${post.author}</p>
                    <p>${post.content}</p>
                `;
                forumPostsContainer.appendChild(postElement);
            });
        }
    } catch (error) {
        console.error("Error displaying forum posts:", error);
    }
};

const handlePostFormSubmit = async (event) => {
    event.preventDefault();
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();
    
    if (!title || !content) {
        alert("Please enter both title and content for the post.");
        return;
    }
    
    try {
        const response = await fetch("/api/forum/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });
        if (!response.ok) {
            throw new Error("Failed to create new post");
        }
        const data = await response.json();
        console.log("New post created:", data);
        displayForumPosts();
    } catch (error) {
        console.error("Error creating new post:", error);
        alert("Failed to create new post. Please try again later.");
    }
};

const postForm = document.getElementById("postForm");
if (postForm) {
    postForm.addEventListener("submit", handlePostFormSubmit);
}

window.addEventListener("load", () => {
    displayForumPosts();
});
