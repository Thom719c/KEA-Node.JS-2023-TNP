<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "../../pages/Home/Home.svelte";
	import Planets from "../../pages/Planets/Planets.svelte";
</script>

<Router>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/planets">Planets</Link>
	</nav>
	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/planets">
            <Planets />
        </Route>

		<!-- <Route path="search/:query" let:params>
			<Search query={params.query} />
		</Route> -->
	</div>
</Router>