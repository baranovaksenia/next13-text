import { Metadata } from "next";
import Link from "next/link";

async function getData() {
	// fetch отрабатывает на сервере
	const response = await fetch("https://64817b7629fa1c5c503175e8.mockapi.io/posts", {
		next: {
			// через сколько повторный запрос на сервер
			revalidate: 60
		}
	});
	if (!response.ok) throw new Error('Enable to fetch posts!')

	return response.json();
}
// серверные компоненты в отличии от обычных
//  реакт компонентов могут быть асинхронными
export default async function Blog() {
	const posts = await getData();
	return (
		<>
			<h1>Blog page</h1>
			<ul>
				{posts.map((post: any) => (
					<li key={post.id}>
						<Link href={`/blog/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
