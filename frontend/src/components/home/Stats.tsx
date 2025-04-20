
const stats = [
  {
    id: 1,
    value: "100+",
    label: "Free SEO Tools",
    description: "Access a comprehensive set of tools for all your SEO needs."
  },
  {
    id: 2,
    value: "1M+",
    label: "Monthly Users",
    description: "Join millions of users who trust our tools for their SEO work."
  },
  {
    id: 3,
    value: "5M+",
    label: "Tools Used Daily",
    description: "Our tools are used millions of times every day worldwide."
  },
  {
    id: 4,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable access to all our tools whenever you need them."
  }
];

const Stats = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl font-bold text-seo-700 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
