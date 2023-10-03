<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
          >
            Show
          </router-link>
          <router-link
            :to="{
              name: 'admin-restaurant-edit',
              params: { id: restaurant.id },
            }"
            class="btn btn-link"
            >Edit</router-link
          >

          <button
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Brisa Paucek",
      tel: "522.770.6724",
      address: "51149 Otis Summit",
      opening_hours: "08:00",
      description:
        "Necessitatibus laboriosam molestias impedit minus eum voluptatum. Quia et quia quidem cum. Quo molestias sed ex aperiam voluptatibus. Corporis animi asperiores tempora perspiciatis qui et tempora incidunt qui. Sed consequatur similique qui quia totam alias.\n \rDolorum harum cum. Est quibusdam sunt harum tempore tenetur voluptatem. Aut non cum.\n \rAut illo repudiandae corporis sed et eum iste. Nisi ut impedit et animi atque quas. Quo amet rerum. Amet tenetur numquam voluptatem id adipisci.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.75440927021156",
      viewCounts: 2,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2023-09-29T09:15:54.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 2,
      name: "Germaine Miller",
      tel: "(028) 919-4481 x287",
      address: "744 Champlin Springs",
      opening_hours: "08:00",
      description:
        "Consequatur et sunt sed in omnis. Explicabo iusto consequatur quia animi. Qui rem vel. Cupiditate dolore accusantium sit sint libero et non reiciendis. Omnis tenetur odio dolorem et molestiae dolor voluptatem. Esse sint fuga.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.225139550843956",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 3,
      name: "Cassie Bogisich",
      tel: "983-273-5919",
      address: "348 Kertzmann Isle",
      opening_hours: "08:00",
      description:
        "Molestias voluptatem ex in laborum id.\nRepellendus ut sit rerum.\nFacere magnam quae quia rem consequatur aliquam et.\nNon voluptas modi qui quis.\nOmnis distinctio iusto consequatur sapiente quis tempore ab rerum exercitationem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.289936541769976",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 4,
      name: "Ericka VonRueden",
      tel: "1-394-048-6892",
      address: "24256 Miracle Fords",
      opening_hours: "08:00",
      description: "necessitatibus occaecati similique",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.647862429270383",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 5,
      name: "Coralie Maggio",
      tel: "840-955-7194 x714",
      address: "10922 Cole Island",
      opening_hours: "08:00",
      description:
        "Molestiae voluptas aut veniam eum et autem voluptatem. Qui doloribus iste. Dolor ut pariatur excepturi consequatur neque ut quod. Est aperiam placeat quia qui impedit. Earum molestiae praesentium aut odio velit quam et tempore dicta.\n \rMinima omnis sapiente explicabo. Laudantium facere possimus nihil. Aut rerum ad ab vero quas. Esse rerum dolorem recusandae quia in. Molestiae magni commodi sed ratione unde. Maxime quisquam qui.\n \rAb accusantium aperiam. Aliquam rem est ut est. Earum eius autem et eum at. Iste blanditiis facere et sit numquam fugiat.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=99.03874894941211",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 6,
      name: "Alaina Schumm",
      tel: "(850) 766-6794 x1819",
      address: "29619 Bashirian Bypass",
      opening_hours: "08:00",
      description:
        "Ipsam cum deserunt aut ratione reprehenderit hic dolor. Commodi est totam nisi quidem nisi qui earum. Autem et nihil et.\n \rDolores blanditiis vero nihil ut accusamus praesentium omnis. Est odio possimus illum magnam dolorem ducimus amet quia. Inventore dolore nemo quisquam reiciendis.\n \rUt enim ipsum id sit veniam ut qui. Sunt iure culpa. Non sed aut reiciendis nihil eligendi ut vel. Qui nobis voluptates laborum. Ratione animi vel ipsum sint porro voluptate officiis quisquam officia. Aut dicta maiores est temporibus quo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.566271072321",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 7,
      name: "Vicente Hand",
      tel: "1-909-527-5737",
      address: "6030 Mertz Turnpike",
      opening_hours: "08:00",
      description:
        "Quis sunt rerum iure. Sit rerum quia. Hic laboriosam voluptas repudiandae fugit commodi architecto. Odit ipsum itaque id. Et fuga rerum et optio occaecati perspiciatis. Cum asperiores dolorem delectus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.68370429610546",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 8,
      name: "Helene Sipes",
      tel: "(364) 509-8601 x551",
      address: "976 Clovis Point",
      opening_hours: "08:00",
      description: "Non odit velit asperiores.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.050491609497286",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 9,
      name: "Dock Goyette",
      tel: "058-093-2225",
      address: "388 Willy Locks",
      opening_hours: "08:00",
      description: "suscipit",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=50.02704392443646",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 10,
      name: "Alyson Padberg",
      tel: "1-706-068-4520 x2462",
      address: "0152 Fay Mews",
      opening_hours: "08:00",
      description: "aperiam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=41.01411544309157",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 11,
      name: "Ms. Ava Hammes",
      tel: "1-187-383-0545 x22357",
      address: "71896 Fritsch Fort",
      opening_hours: "08:00",
      description:
        "Necessitatibus aliquam earum expedita porro cum assumenda consectetur. Ea at et sit est porro recusandae. Delectus minus ut asperiores impedit esse provident qui.\n \rPlaceat aut quis exercitationem possimus eveniet. Aspernatur ipsum corporis velit nam et magnam maxime voluptatem. Vitae molestias et unde a. Quibusdam earum adipisci mollitia cumque accusamus eligendi et non. Ratione esse assumenda sed nesciunt. Nesciunt dolor tempora et ducimus nihil corrupti.\n \rItaque quis facilis. Totam vitae minima occaecati ut accusamus repellendus incidunt aut. Et quam quas facere. Ea est eveniet facere est facilis voluptatem nostrum nihil eaque. Quia voluptatem sint fugit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=78.62727785271748",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 12,
      name: "Jeff Larson",
      tel: "114-907-6657 x10130",
      address: "15043 Kunde Fields",
      opening_hours: "08:00",
      description:
        "Ut saepe quis excepturi odio repudiandae quis quidem ducimus facere. Eos officiis iure et qui nihil ut ad debitis dignissimos. Illo ut aut sapiente et eaque et nisi qui eius.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=51.47654527232795",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 13,
      name: "Blanche Yost",
      tel: "(531) 779-5034",
      address: "92849 Buster Forge",
      opening_hours: "08:00",
      description: "Quas aut dolore fugit quasi qui modi nesciunt unde.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=55.79665616816916",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 14,
      name: "Candida Cummings Jr.",
      tel: "528.628.7750 x5413",
      address: "61609 Jerde Pine",
      opening_hours: "08:00",
      description:
        "Maxime distinctio aperiam facilis aut distinctio. Nesciunt sapiente commodi sint quibusdam totam. Quisquam at consequuntur blanditiis inventore exercitationem sunt odit. Cupiditate nisi quis laudantium eius.\n \rConsequatur rerum nobis sed. Consequatur maxime id dolor eum corporis sint vel quasi eos. Natus autem itaque consequatur consequuntur soluta rem quis quibusdam. Numquam delectus aspernatur quam atque provident explicabo id natus vel.\n \rEt nobis est omnis blanditiis sit consequatur consequatur. Perspiciatis consequatur et perferendis molestias. Ut id cumque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=34.20892468286403",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 15,
      name: "Lea Hessel",
      tel: "(351) 838-6582 x66523",
      address: "783 Stacey Ports",
      opening_hours: "08:00",
      description:
        "Eum non laudantium iusto rerum tenetur alias magni. Autem mollitia tenetur tenetur ea ut quibusdam recusandae sunt. Porro aut aut ratione et tempore aliquid modi. Numquam aut id id. Error voluptatem rem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=64.39220489773297",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 16,
      name: "Alycia Berge",
      tel: "934.304.8237 x020",
      address: "77806 Kling Harbor",
      opening_hours: "08:00",
      description:
        "Aut accusantium ducimus quasi praesentium culpa nobis illum unde.\nNam consequatur repellendus et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.50900930316807",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 17,
      name: "Ricardo Dare",
      tel: "216.404.2966",
      address: "84780 Kreiger Village",
      opening_hours: "08:00",
      description:
        "Velit incidunt asperiores doloribus ut sint voluptas. Sed suscipit ratione autem non. Saepe nobis consectetur quia iure dolorum ut facilis.\n \rRerum delectus iusto ut ratione aut ab fugiat autem. Aut commodi est consectetur quia aut placeat cum facilis quo. Et voluptatem nostrum soluta consequatur alias enim. Deleniti deserunt voluptas sequi ipsam voluptas qui quaerat quis.\n \rQuis ut quibusdam qui. Est ipsum provident nemo odit id sed enim quia commodi. Dicta ea voluptatibus qui placeat repellendus. Dolor ducimus nam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=40.381351750617945",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 18,
      name: "Ms. Elise Roob",
      tel: "1-042-067-7910 x79387",
      address: "1205 Yost Turnpike",
      opening_hours: "08:00",
      description: "repellat aut totam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=78.50721149888538",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 19,
      name: "Johnathan Bartoletti Sr.",
      tel: "(847) 622-1589",
      address: "8370 Mann Terrace",
      opening_hours: "08:00",
      description: "illum qui deleniti",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=18.46561353421321",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 20,
      name: "Viva Hessel",
      tel: "1-449-062-0818 x41611",
      address: "4874 Kuvalis Courts",
      opening_hours: "08:00",
      description:
        "Eligendi totam temporibus inventore minima eos qui. Iste rerum est perspiciatis. Sed provident qui. Dolor esse quas consectetur. Et quas fugiat omnis doloremque voluptatem. Blanditiis explicabo velit iusto.\n \rTenetur labore enim. Ut in quia voluptas sint. Iste at dolorum dolorem facere saepe aliquid ex corporis. Aut dignissimos quia deleniti sint aut eveniet quia repudiandae. Ducimus facere totam reiciendis recusandae dolor occaecati sint ut reprehenderit.\n \rEt provident et delectus nam labore nesciunt exercitationem ab nobis. Tenetur nam soluta corrupti et temporibus odit eum ut. Ut veritatis ullam ut id iste iusto. Nam eligendi sunt.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=46.17321748358003",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 21,
      name: "Ms. Claude Kilback",
      tel: "1-610-485-0528 x96318",
      address: "5132 Reinger Valley",
      opening_hours: "08:00",
      description: "in molestiae a",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=82.93915379484798",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 22,
      name: "Ariel Harris",
      tel: "(925) 138-3671",
      address: "14932 Moen Drive",
      opening_hours: "08:00",
      description: "inventore",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.25442564555432",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 23,
      name: "Glenda O'Connell",
      tel: "813.107.0462 x0934",
      address: "69619 Bechtelar Hills",
      opening_hours: "08:00",
      description:
        "Omnis numquam voluptas. Reprehenderit eius minima impedit autem soluta asperiores laboriosam. Pariatur vero illo aliquid at magnam dolore aut.\n \rMinima qui aspernatur odio ut. Sint iste dolores deleniti sunt libero nobis provident. Dicta quaerat rerum nihil dolores pariatur. Facere asperiores minus officia.\n \rVelit quidem magni non sint vitae. Vel in perferendis minus et. Fugiat maiores facilis. Ut magni autem modi architecto voluptatem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=44.986049360511934",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 24,
      name: "Alysa Conn",
      tel: "541-612-5802 x137",
      address: "56187 Swaniawski Divide",
      opening_hours: "08:00",
      description:
        "Omnis reprehenderit fugiat adipisci unde. Vel et corporis suscipit ratione dolor natus quibusdam est. Provident beatae voluptates repellat quia minima. Rem assumenda a suscipit quibusdam dolores sed officiis libero. Consequuntur pariatur animi harum eum. Maiores eum ad voluptate maiores vel eius in.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.80221107762706",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 25,
      name: "Maurine Collier",
      tel: "(600) 300-3974 x412",
      address: "3306 Hettie Road",
      opening_hours: "08:00",
      description:
        "Quasi atque dicta cumque et quia iure. Vitae consequuntur alias reprehenderit. Rerum quia incidunt ipsum est ducimus aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=34.263373081400395",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 26,
      name: "Kaden Strosin",
      tel: "540-328-9151",
      address: "94127 Alex Field",
      opening_hours: "08:00",
      description: "magnam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.68994944297543",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 27,
      name: "Lane Witting",
      tel: "(391) 720-9926",
      address: "989 Spinka Point",
      opening_hours: "08:00",
      description: "impedit quae corrupti",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.19841900813305",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 28,
      name: "Margarita Hagenes",
      tel: "(293) 580-8512",
      address: "58727 Bergstrom Groves",
      opening_hours: "08:00",
      description: "voluptas voluptate ut",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=86.75923871664398",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 29,
      name: "Miss Tressa Grant",
      tel: "(287) 532-9540 x84627",
      address: "283 Leannon Way",
      opening_hours: "08:00",
      description:
        "Mollitia voluptatum ducimus similique voluptas tempore dolor aspernatur. Autem temporibus quasi dolorem omnis. Ducimus incidunt ut optio consequatur recusandae corrupti. Et doloremque fugiat maxime fuga et omnis et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.84682690128065",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 30,
      name: "Elbert Luettgen",
      tel: "649-267-6520",
      address: "45522 Medhurst Tunnel",
      opening_hours: "08:00",
      description:
        "Nisi amet blanditiis mollitia quidem eos et odit necessitatibus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.70555031151049",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 31,
      name: "Dolly Ruecker",
      tel: "1-634-061-4502",
      address: "43914 Adams Fords",
      opening_hours: "08:00",
      description:
        "Sunt tempore fuga voluptatem soluta molestias.\nNesciunt aut quo architecto repellendus illo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=83.21680971726725",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 32,
      name: "Cornelius Watsica",
      tel: "(649) 548-3270 x099",
      address: "43803 Funk Plaza",
      opening_hours: "08:00",
      description:
        "Rerum veritatis eius consequatur exercitationem aut et ea ut mollitia. Ea distinctio rem. In nobis dolores quo. Suscipit repellendus est voluptatem quo tenetur eligendi ratione. Tempora magni adipisci. Dolor aut quis tenetur quam saepe consequuntur at id.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=91.15842254278968",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 33,
      name: "Anibal Schmeler",
      tel: "624-231-1487 x4753",
      address: "741 Osinski Squares",
      opening_hours: "08:00",
      description:
        "Sed accusantium mollitia atque in qui quia nostrum quae. In quo iusto. Saepe dolor qui. Vero libero eum voluptatibus sunt sed atque quis. Non quo et eaque numquam. Atque voluptates necessitatibus ipsam est ut nisi.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=74.31935063745034",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 34,
      name: "Kattie Langworth",
      tel: "1-426-570-9085 x449",
      address: "54337 Julie Springs",
      opening_hours: "08:00",
      description:
        "Voluptas in ea sed repellat illum.\nAut doloremque velit aut eos sint.\nAmet dolores exercitationem deleniti sit ipsam ut soluta delectus.\nDeserunt voluptatum tenetur.\nRepellat voluptatum vero totam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=46.390964767980925",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 35,
      name: "Emile Dicki Sr.",
      tel: "(914) 139-5001 x848",
      address: "341 Meredith Ports",
      opening_hours: "08:00",
      description: "in",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=95.71951925031586",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 36,
      name: "Zoila O'Reilly",
      tel: "(015) 263-2008 x78214",
      address: "23305 Ullrich Vista",
      opening_hours: "08:00",
      description: "sint",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=7.3274971987348225",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 37,
      name: "Hilario Dach",
      tel: "(872) 010-5448 x0661",
      address: "1525 Mittie Lakes",
      opening_hours: "08:00",
      description:
        "Repellendus fugit quibusdam beatae esse numquam doloremque et reiciendis sit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=1.4338890486416567",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 38,
      name: "Adriana Raynor",
      tel: "793.670.6954",
      address: "33888 Branson Inlet",
      opening_hours: "08:00",
      description: "Sed fuga magni est aut quos alias enim.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=29.25909567971008",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 39,
      name: "Harrison Borer",
      tel: "(488) 399-9665",
      address: "79094 Cole Station",
      opening_hours: "08:00",
      description:
        "Dolorum necessitatibus id temporibus laboriosam. Eligendi possimus ut. Laudantium iure iusto veniam molestias quia culpa et. Vero perspiciatis consequatur itaque molestiae consequatur. Corrupti corporis dolores omnis sed et consequatur fuga.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=48.025295246569065",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 40,
      name: "Suzanne Streich",
      tel: "675.917.8924 x226",
      address: "3866 Pollich Green",
      opening_hours: "08:00",
      description:
        "Cupiditate sunt quis ea.\nEst atque necessitatibus est dolorum expedita natus impedit quibusdam.\nPorro odit necessitatibus voluptas voluptas dolore at quia fuga et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=27.148454030197833",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 41,
      name: "Hester Turner",
      tel: "1-220-433-6868",
      address: "759 Lori Lights",
      opening_hours: "08:00",
      description:
        "Dolor eum adipisci nobis consectetur error doloremque ratione corporis et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.28185121345626",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 42,
      name: "Zion Mann I",
      tel: "(159) 616-2489 x06902",
      address: "7853 Kuhlman Greens",
      opening_hours: "08:00",
      description: "numquam ratione enim",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=23.209683102844703",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 43,
      name: "Kathleen Daugherty",
      tel: "929-650-6243 x2508",
      address: "4789 Balistreri Street",
      opening_hours: "08:00",
      description: "laboriosam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=61.366893030729976",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 44,
      name: "Devon McCullough",
      tel: "(492) 026-8418 x3289",
      address: "2738 Padberg Mountain",
      opening_hours: "08:00",
      description: "autem",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.76610709546867",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 45,
      name: "Lonnie Ward",
      tel: "066-003-8043 x37157",
      address: "5541 Prohaska Courts",
      opening_hours: "08:00",
      description:
        "Sequi voluptas qui et id id doloremque quia sunt sit.\nIn aut odio fugiat amet ducimus.\nFugit maxime pariatur eos deserunt ad quos voluptatum.\nMaxime soluta sed.\nIpsam cumque ratione.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.387348526880224",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 46,
      name: "Maxie Grimes",
      tel: "630.131.8514 x10613",
      address: "24110 Kelly Lake",
      opening_hours: "08:00",
      description:
        "Nobis a facere ut dolor ut dolorum alias excepturi asperiores.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=96.85868449955895",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 47,
      name: "Chelsey Durgan",
      tel: "1-601-099-2576 x3025",
      address: "25902 Kutch Tunnel",
      opening_hours: "08:00",
      description: "non doloribus et",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.087908104129848",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 48,
      name: "Hank Halvorson",
      tel: "452.041.5018 x279",
      address: "567 Daisy Manors",
      opening_hours: "08:00",
      description: "at",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=17.210185699313918",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 49,
      name: "Andrew Wilkinson",
      tel: "1-079-333-8813",
      address: "288 Lulu Way",
      opening_hours: "08:00",
      description:
        "Numquam est ex cum. Eaque harum est iure. Quos consequatur praesentium.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.06247042719298",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
    {
      id: 50,
      name: "Johnson Batz",
      tel: "(453) 557-7492",
      address: "2637 Candelario Gateway",
      opening_hours: "08:00",
      description: "assumenda saepe nesciunt",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=69.4863452792938",
      viewCounts: 0,
      createdAt: "2022-01-29T09:35:37.000Z",
      updatedAt: "2022-01-29T09:35:37.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-01-29T09:35:37.000Z",
        updatedAt: "2022-01-29T09:35:37.000Z",
      },
    },
  ],
};

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    deleteRestaurant(restaurantId) {
      this.restaurants = this.restaurants.filter(
        (restaurant) => restaurant.id !== restaurantId
      );
    },
  },
};
</script>
