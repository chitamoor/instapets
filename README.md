<li class="lead">InstaPets is entirely a client-side app built using javascript/jQuery</li>
<li class="lead">InstaPets uses the Instagram API to fetch the photos tagged with the following keywords - cat, dog, hamster, bird and rabbit</li>
<li class="lead">Only 20 photos are initally fetched for each tag. Further check is in place to try and narrow down the photos that have a minimal set of expected matching tags</li>
<li class="lead">The endpoint used to pull the tagged media is <span class="label label-default">/tags/tag-name/media/recent</span></li>
<li class="lead">Clicking on the specific pet type listed in the <strong>Side Nav panel</strong> will only display the media with the corresponding tag</li>
<li class="lead">The last item in the side Nav, <strong>My Feed</strong>, displays the current logged-in user's feed. It's initially hidden until you click on the <strong>Login</strong> menu item in the Top Nav</li>
<li class="lead"><strong>Login</strong> allows a user to login <strong>using OAuth</strong>. Once logged in, InstaPets will pull in the user's feed, which can be exclusively seen when clicked on the <strong>My Feed</strong> link available in the Side Nav.</li>
<li class="lead"><span class="label label-default">/users/self/feed</span> endpoint is used to pull in the logged-in user's feed</li>
