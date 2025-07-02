import Link from 'next/link'

export default function IntroducingGrabbitBlog() {
  return (
    <div className="blog-bg min-h-screen">
      <div className="container py-16">
        <article className="blog-article">
          <header className="mb-12">
            <h1>
              Introducing Grabbit — Community-Powered Errands for Campus Life
            </h1>
            <div className="blog-meta mb-8">
              <p>July 1, 2025</p>
              <p>By Shamit Surana and Sebastian Freitag</p>
            </div>
          </header>

          <div className="blog-content">
            <p>
              Six weeks ago, a simple craving sparked an idea. Our co-founder Sebastian was up late, really wanting a burrito but too busy to go get one. When his roommate Alex walked in—burrito in hand—Sebastian thought: "If Alex had known I wanted one too, he could've just grabbed it for me."
            </p>
            
            <p>
              That moment became Grabbit, a mobile app that turns everyday store runs into quick favors for friends and neighbors.
            </p>

            <h2>The Problem</h2>
            <ul>
              <li><strong>No coordination.</strong> Nobody wants to text every friend before heading to CVS or Chipotle just to ask if they need something.</li>
              <li><strong>Awkward paybacks.</strong> It's always weird to spot someone money and then have to remind them to pay you back.</li>
            </ul>

            <h2>Our Solution</h2>
            
            <p>
              Grabbit. Allowing people who are already out on errands to pick up things for others in their community.
            </p>
            
            <h3>How It Works</h3>
            <ul>
              <li><strong>A live request board</strong> keeps every request from friends in your Grabbit group in one place.</li>
              <li><strong>Post your request once</strong> and it lays dormant on the store until a friend walks by who can grab it.</li>
              <li><strong>Location-based notifications</strong> will ping your friends/helpers on their phone to make them aware of near by requests.</li>
              <li>No one has to check the app constantly; the right person gets notified at the right time.</li>
              <li><strong>Automatic pre-payment</strong> removes the hassle of "hey, can you pay me back for that burrito?"</li>
              <li>Requesters pay up front, helpers are reimbursed right away.</li>
              <li><strong>Drop-off on the way home.</strong> Because helpers are already headed back to the same hall, delivery feels friction-free.</li>
            </ul>

            <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              The result? Errands get done while you focus on other things, it costs less than delivery apps, and whoever's already out anyways can earn some cash on the side.
            </p>

            <h2>Where We Are Now</h2>
            <ul>
              <li><strong>Beta testing</strong> with close friends and family.</li>
              <li><strong>Working on our incentive structure:</strong> We're trying out tip options and non-cash rewards.</li>
              <li><strong>Always improving</strong> and we'd love your feedback.</li>
            </ul>

            <h2>Why We're Excited</h2>
            <p>
              Grabbit taps into the goodwill of campus communities, making local commerce more sustainable and human than traditional gig-delivery platforms. If you're already at the store, bringing back a classmate's burrito (or sticky notes) should be easy—and now it is.
            </p>
            
            <h2>Why the status quo isn't sustainable (literally)</h2>
            <p>
              Traditional delivery platforms solve convenience with fleets of cars or motorcycles, mountains of packaging—and the planet pays the price.
            </p>
            
            <ul>
              <li>Last-mile deliveries now generate up to 40% of all e-commerce emissions—the most carbon-intensive leg of the trip. <em>(parcelandpostaltechnologyinternational.com)</em></li>
              <li>A single passenger car or delivery vehicle emits about 4.6 metric tons of CO₂ every year. With roughly 1 million DoorDash drivers, that's 4.6 million tons from just one service. <em>(insights.workwave.com)</em></li>
              <li>On the waste side, the average consumer creates more than 10 kg of single-use plastic every year from food-delivery packaging alone. <em>(viable.earth)</em></li>
              <li>In the U.S., restaurants go through nearly one trillion disposable food-service items each year—most of which come with take-out and delivery orders. <em>(axios.com)</em></li>
            </ul>

            <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              Grabbit's <strong>"already-there" model</strong> means fewer extra trips, lower emissions, and one less plastic bag on your doorstep.
            </p>

            <h3>Using proximity and trust to build micro-networks of support</h3>
            <p>
              Right now we're focused on dorms, where key-card access and busy schedules make gig couriers unreliable. But the same idea works for student apartments, co-ops, and any neighborhood where people already trust each other.
            </p>
            
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6">
              "We feel something like Grabbit has been long overdue. It leverages community and friendship to save everyone time and money, while offering college students casual opportunities to make a buck on the side without signing up as official 'deliverers.' Our model builds on the idea that people already at stores or restaurants should bring along stuff for their peers on the way home."
            </blockquote>

            <h3>What we're experimenting with next</h3>
            <ul>
              <li><strong>Speed.</strong> Community delivery isn't instant (yet). We're working on ways to expand request pools beyond your immediate friend circle to shorten wait times.</li>
              <li><strong>Bigger circles.</strong> Once dorms are running smoothly, we'll open campus-wide groups and look at partnerships with nearby neighborhoods.</li>
            </ul>

            <p>
              We're still early, and Grabbit is evolving every day. But we're convinced that community-powered delivery should be the future.
            </p>

            <h2>Join the journey</h2>
            <p>
              We built Grabbit because we needed it ourselves—and because it should exist. If you want to join us on our mission, please consider signing up to our waitlist:
            </p>
            
            <Link 
                href="/waitlist" 
                className="btn-primary"
              >
                Join the Grabbit Waitlist
              </Link>

            <p className="mt-4">
              Together, we'll turn quick errands into everyday win-wins.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
