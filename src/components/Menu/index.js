/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./styles.scss";
const ImageLink = `https://github.com/bedimcode/responsive-sidebar-submenu/blob/main/assets/img/`;
function Menu() {
  const [toggle, setToggle] = React.useState(false);
  return (
    <>
      <header className="header">
        <div className="header__container">
          <img
            src={`${ImageLink}perfil.jpg?raw=true`}
            alt="header"
            className="header__img"
          />
          <a href="/" className="header__logo">
            Seizen
          </a>
          <div className="header__search">
            <input
              type="search"
              placeholder="Search"
              className="header__input"
            />
            <i className="bx bx-search header__icon"></i>
          </div>
          <div
            className="header__toggle"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <i
              className={toggle ? "bx bx-x" : "bx bx-menu"}
              id="header-toggle"
            ></i>
          </div>
        </div>
      </header>
      <div className={toggle ? "navbar show-navbar" : "navbar"} id="navbar">
        <nav className="navbar__container">
          <div>
            <a href="#" className="navbar__link navbar__logo">
              <i className="bx bxs-disc nav__icon"></i>
              <span className="navbar__logo-name">Seizen</span>
            </a>
            <div className="navbar__list">
              <div className="navbar__items">
                <h3 className="navbar__subtitle">Profile</h3>
                <a href="#" className="navbar__link active">
                  <i className="bx bx-home navbar__icon"></i>
                  <span className="navbar__name">Home</span>
                </a>
                <div className="navbar__dropdown">
                  <a href="#" className="navbar__link">
                    <i className="bx bx-user navbar__icon"></i>
                    <span className="navbar__name">Profile</span>
                    <i className="bx bx-chevron-down navbar__icon navbar__dropdown-icon"></i>
                  </a>
                  <div className="navbar__dropdown-collapse">
                    <div className="navbar__dropdown-content">
                      <a href="#" className="navbar__dropdown__item">
                        Passwords
                      </a>
                      <a href="#" className="navbar__dropdown__item">
                        Mail
                      </a>
                      <a href="#" className="navbar__dropdown__item">
                        Accounts
                      </a>
                    </div>
                  </div>
                </div>

                <a href="#" className="navbar__link">
                  <i className="bx bx-message-rounded navbar__icon"></i>
                  <span className="navbar__name">Messages</span>
                </a>
              </div>
              <div className="navbar__items">
                <h3 className="navbar__subtitle">Menu</h3>
                <div className="navbar__dropdown">
                  <a href="#" className="navbar__link">
                    <i className="bx bx-bell navbar__icon"></i>
                    <span className="navbar__name">Notifications</span>
                    <i className="bx bx-chevron-down navbar__icon navbar__dropdown-icon"></i>
                  </a>
                  <div className="navbar__dropdown-collapse">
                    <div className="navbar__dropdown-content">
                      <a href="#" className="navbar__dropdown__item">
                        Blocked
                      </a>
                      <a href="#" className="navbar__dropdown__item">
                        Silenced
                      </a>
                      <a href="#" className="navbar__dropdown__item">
                        Publish
                      </a>
                      <a href="#" className="navbar__dropdown__item">
                        Program
                      </a>
                    </div>
                  </div>
                </div>

                <a href="#" className="navbar__link">
                  <i className="bx bx-compass navbar__icon"></i>
                  <span className="navbar__name">Explore</span>
                </a>
                <a href="#" className="navbar__link">
                  <i className="bx bx-bookmark navbar__icon"></i>
                  <span className="navbar__name">Saved</span>
                </a>
              </div>
            </div>
          </div>
          <a href="#" className="navbar__link navbar__logout">
            <i className="bx bx-log-out navbar__icon"></i>
            <span className="navbar__name">Log Out</span>
          </a>
        </nav>
      </div>
      <main>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
            laudantium accusantium. Perspiciatis quisquam eos vitae voluptatibus
            cupiditate labore facere iste, maxime accusantium pariatur, eius
            quod dolor aut modi doloremque numquam. Voluptates impedit
            necessitatibus doloribus magni, minus, autem aut quibusdam dolores
            mollitia iste ab facilis, molestiae cumque debitis iure fugiat
            voluptatibus incidunt cupiditate? Suscipit atque modi nobis libero
            corrupti? Ipsam, ea. Maiores dolor autem et voluptate molestiae
            optio, nihil nesciunt doloribus adipisci aut illum voluptatibus
            perferendis blanditiis possimus magni corrupti rem cum dolores!
            Eveniet delectus at nisi sed placeat quas minus. Et voluptates
            voluptatem incidunt provident molestiae nesciunt aspernatur dicta ad
            officia facilis laborum iste maiores eius odio modi similique
            corporis, asperiores recusandae? Inventore eius placeat in numquam,
            iste quibusdam dolore. Laboriosam ipsam aperiam ratione animi cum
            alias! Consectetur fuga exercitationem numquam libero laudantium
            ratione! Voluptate minus, omnis culpa ipsa adipisci ipsam
            voluptatum, unde consequuntur dicta at praesentium animi aliquid?
            Officiis. Laudantium repellat alias possimus obcaecati earum
            doloribus cupiditate, nulla odit neque rerum fuga eos soluta quod
            iste vero commodi sapiente voluptatum, assumenda minima? Eveniet
            provident laboriosam repellat voluptatem nemo expedita! Nesciunt
            molestiae optio maiores harum velit officia voluptate dicta sit
            repellendus sint, illum ex laboriosam debitis consectetur placeat
            accusamus earum, impedit a dolor, asperiores modi sunt officiis
            adipisci nam. Rem. Et, facilis dolorem. Reiciendis saepe distinctio
            unde? Exercitationem debitis nemo, animi adipisci tempora enim
            minima iure inventore quibusdam sunt pariatur maiores harum! Esse
            eum asperiores assumenda pariatur odio sequi id! Adipisci
            perferendis quidem incidunt, saepe et unde alias eligendi cumque
            vero ab. Doloremque dolore ipsa est eum aut fugit neque tempora
            magni totam nisi. Ullam atque officia quas doloribus eveniet! Harum,
            incidunt dignissimos facilis expedita et tempora explicabo mollitia
            amet, nulla commodi consectetur ab, repellendus cum animi? Quibusdam
            unde earum maiores! Temporibus, quod. Optio ut velit adipisci
            cupiditate. Magnam, omnis. Ullam fuga natus, et molestias illo
            debitis vel earum voluptatum tenetur inventore, corrupti voluptatem
            nesciunt corporis assumenda dolores ad itaque asperiores cum
            incidunt sed laborum porro praesentium, magnam cupiditate.
            Cupiditate. Nostrum repellendus dolor ex officiis laboriosam.
            Eligendi accusamus vero temporibus aperiam corrupti a nihil nulla
            dicta! Velit quos eligendi atque similique saepe accusamus doloribus
            labore minima, incidunt at possimus officia! Recusandae voluptatum
            atque culpa, deserunt neque illum qui quod corporis sed non fuga
            debitis hic. Provident quidem explicabo dolores sit, ab molestiae
            laborum totam, temporibus itaque asperiores quae, minima mollitia?
            Blanditiis dolorem aspernatur ipsam hic voluptatem cum placeat natus
            quod distinctio. Distinctio necessitatibus recusandae libero
            quibusdam deserunt, rerum nulla? Voluptate debitis neque accusantium
            autem mollitia enim consequuntur. In, exercitationem ea! Itaque ut
            quas sequi quam animi ex nihil minus cum modi labore molestiae
            dolorum quibusdam velit deleniti, vero odit voluptas! Ad blanditiis
            quaerat ipsa harum dicta animi maxime consequatur nam? Impedit optio
            quaerat mollitia deleniti incidunt officia voluptatum et eaque
            voluptate officiis, reiciendis aliquid tempora nostrum similique
            eveniet nisi exercitationem doloribus quis velit quas! Reiciendis
            voluptatem non totam aut ea? Quis dolor repellendus ab debitis illo,
            eius explicabo deleniti porro tenetur, facere voluptatem sequi
            possimus tempora et voluptates adipisci, illum saepe beatae.
            Similique facilis ipsa nostrum voluptatibus dolorem amet quasi. Non
            itaque quasi asperiores explicabo molestias at voluptatibus quisquam
            reprehenderit. Mollitia officia rerum soluta quis saepe deserunt
            aperiam consectetur modi iure fugiat ipsa, nisi accusamus veritatis
            nostrum dolores quisquam? Impedit. Sit recusandae velit alias
            mollitia obcaecati? Cum aut est consequatur iste officia porro
            molestias quasi officiis modi, at, molestiae explicabo libero, eaque
            error. Voluptatem necessitatibus natus ipsa nam autem pariatur.
            Consequatur, deleniti reprehenderit quasi saepe modi provident
            temporibus! Beatae officiis suscipit unde, porro error, illum quo
            soluta blanditiis repudiandae ipsum eveniet? Laboriosam, beatae
            velit. Saepe libero iusto fugit accusamus at?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
            numquam suscipit voluptas repellendus, itaque aperiam quas tenetur
            id eos odio maxime asperiores similique cupiditate alias eius
            distinctio obcaecati harum modi. Laboriosam, perspiciatis!
            Reiciendis sequi impedit at in dolor officiis, eveniet voluptates
            provident recusandae soluta corrupti voluptatem, ipsum debitis animi
            aperiam eum quas ex sed earum adipisci architecto nobis quo! Qui?
            Nemo nesciunt obcaecati commodi porro consequuntur eum aliquam
            molestiae, ea modi ipsum itaque. Officia fugiat laudantium totam
            neque pariatur iusto maxime. Labore enim repellat a molestias? Ab,
            deleniti! Pariatur, impedit? Reiciendis culpa eum voluptate alias
            minima molestiae soluta natus, quasi quisquam consequuntur,
            veritatis non quod magnam quis iure delectus, blanditiis et veniam
            optio eaque. Ab esse eligendi perferendis fugit iste. Veritatis,
            expedita harum! Laboriosam eaque nobis distinctio fuga voluptas
            eligendi quae quisquam veniam. Culpa sunt, beatae itaque non eos ut
            fugit est pariatur perferendis ipsa modi provident quia nobis eius.
            Explicabo nulla maxime dolores consectetur odio consequuntur sed
            doloremque omnis veniam sunt tempore accusantium, nihil illo
            reiciendis delectus eveniet nobis autem voluptatum id! Repellat hic
            facere eos soluta, eaque fugit. Alias vero atque dolores hic,
            facilis illum iste corporis corrupti expedita, voluptate eaque fuga
            illo. Quas laudantium quaerat a itaque similique animi repellendus
            quam molestias ipsa, nihil impedit fuga praesentium. Vel minima
            provident nulla ipsum nesciunt ut illum cupiditate est nobis sint
            laborum, dolor consequatur odio recusandae sapiente quaerat
            quibusdam nostrum fugit qui. Nobis eius velit sequi, quibusdam
            aspernatur dolores. Ex doloremque, similique magni velit beatae
            labore esse commodi ipsum, hic officia expedita voluptas quidem
            ratione magnam minus sed veritatis. Dolorem suscipit accusantium
            voluptas nisi natus iste vero autem obcaecati? Reprehenderit
            voluptates corporis sint fuga, non libero facilis repellendus. Amet
            dolor, perspiciatis consequatur nemo laboriosam cum repellendus
            tempora explicabo iure provident vel dolore ex cupiditate error
            veniam molestias asperiores ut. Ipsam veritatis voluptatibus
            incidunt ea sequi magni accusamus et hic error earum recusandae
            cumque voluptatem odit provident quaerat nesciunt perspiciatis, ad
            nostrum soluta? Molestias sequi laudantium, sunt est ullam tempora!
            Porro dolor delectus at labore architecto. Voluptatum vitae odit
            iusto quam, unde dolorum, ea rem ipsam facilis, asperiores cum qui
            autem aut? Perferendis dolore odio atque maxime, magni libero nisi?
            Ex facilis dicta voluptatibus provident quam dignissimos at
            recusandae expedita sed culpa! Maxime vel sint corporis quae sequi
            quos debitis, provident ratione aspernatur facilis totam odio magni
            consequatur? Dolorem, dicta! Harum veritatis voluptatum laudantium
            quod eligendi cumque aspernatur assumenda aut velit nisi adipisci
            consequuntur fugiat ea ducimus, suscipit repellendus sit, error,
            itaque quas mollitia molestiae tenetur commodi est! Amet, sint.
            Deserunt possimus cupiditate reiciendis, eaque sed, distinctio, quae
            cum ipsam veritatis totam dolorem eum? Modi magnam voluptatum
            consequuntur magni! Hic obcaecati veniam eaque explicabo ea ratione
            omnis tempore, debitis consequuntur. Numquam aut impedit quos
            corporis quidem explicabo dolorum incidunt alias distinctio
            reiciendis laboriosam, eaque saepe voluptatum! Culpa consequatur,
            eius expedita porro dolore incidunt perspiciatis dignissimos
            consequuntur laborum, commodi nam ipsa. Voluptatibus sequi ullam,
            corrupti non laudantium beatae rerum animi quisquam voluptas eius
            modi eveniet, tenetur maiores atque ea facilis hic quis voluptatem
            soluta itaque ducimus excepturi expedita. Labore, earum. Aperiam.
            Unde, dolorum assumenda similique vero pariatur, distinctio natus
            maiores saepe possimus illum, voluptas iusto nemo necessitatibus
            architecto dolor ex ullam? Natus, voluptates atque? Nihil harum
            reiciendis expedita nostrum repellat porro. Sunt similique ipsum qui
            praesentium quisquam explicabo alias tenetur veniam debitis iste.
            Rerum aliquid officia, facilis error, ratione beatae obcaecati culpa
            quisquam vel laboriosam tempora rem ad et temporibus non! Suscipit
            a, dolor facere illo esse quisquam quo provident laboriosam animi
            sit sed quam. Sint voluptatibus veritatis, maxime quam quibusdam
            voluptates optio harum, earum perspiciatis vero, quaerat quo
            perferendis dicta.
          </p>
        </section>
      </main>
    </>
  );
}

export default Menu;
