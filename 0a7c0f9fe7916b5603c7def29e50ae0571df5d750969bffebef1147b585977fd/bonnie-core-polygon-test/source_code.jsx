const ownerAddress = "0x889A0622898e9780dc771F027aF1c53c0e1c53BF";
const nftImageURL =
  "https://cdn.discordapp.com/attachments/1118019643261595740/1186663703727317002/pansavuth.khe.corepolygon_a_short_hair_girl_with_goggles_glimme_bb615670-e7be-4f64-919e-e46ad525dac5.png?ex=659411b2&is=65819cb2&hm=bab9612315f08c244122e7f59599775d29e98d1fc0f1d572e394dc88e7da7f06&";
//"https://bitkubipfs.io/ipfs/QmbzXzcQjwG6kdQQbGDoDvcETn1KeEKEAnWTKycWrriauk";
const glbFileURL = "https://models.readyplayer.me/64ab8110ae49359d42d0b883.glb";

const data = fetch(
  "https://www.bkcscan.com/api?module=account&action=tokenlist&address=${ownerAddress}".replace(
    "${ownerAddress}",
    ownerAddress
  ),
  {
    method: "GET",
  }
);

const frameWidth = 600;
const frameheight = 600;
const margin = 16;
const canvasWidth = frameWidth - margin;
const canvasHeight = frameheight - margin;

const CanvasContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  width: ${frameWidth}px;
  height: ${frameheight}px;
  background-color: #333333;

  border-radius: 40px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  max-width: 600px;
`;

const MainContainer = styled.div`
  width: 100%;
  padding-block: 32px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:32px;
`;

const ContentContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const code2 = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js"></script>
<script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
<body>
  <script>
    const container = document.createElement('div');
    document.body.appendChild(container);
    const containerWidth = ${canvasWidth}; // Set your desired width
    const containerHeight = ${canvasHeight}; // Set your desired height
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';
        
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({alpha: true});

    const canvasWidth = ${canvasWidth};
    const canvasHeight = ${canvasHeight};
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      const newWidth = ${canvasWidth};
      const newHeight = ${canvasHeight};

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -2.6;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
    plane.scale.multiplyScalar(2);
    plane.receiveShadow = true;

    let loadedGroup = null;
    const loader = new THREE.GLTFLoader();
    loader.load("${glbFileURL}", (gltf) => {
      gltf.scene.traverse(function (child) {
        if ((child).isMesh) {
            const m = child
            m.receiveShadow = true
            m.castShadow = true                            
        }
      })
                    
      const model = gltf.scene;

      scene.add(model);

      loadedGroup = model;
      loadedGroup.scale.multiplyScalar(3);
      loadedGroup.position.y -= 2.5
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    light.castShadow = true;

    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.intensity = 2.5;
    scene.add( ambientLight );
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    document.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });
    
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            loadedGroup.rotation.y += deltaMove.x * 0.01;

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    const animate = function () {
      requestAnimationFrame(animate);

      if(loadedGroup != null && !isDragging) {
        loadedGroup.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();
  </script>
</body>
`;

return data !== null ? (
  <MainContainer>
    <Header>
      <h2 style={{ fontWeight: 600 }}>
        3D NFT Visualization (proof of concept)
      </h2>
      <p>Core Polygon : 3D NFT</p>
    </Header>

    <ContentContainer>
      {true && (
        <CanvasContainer>
          {true && <iframe className="h-100 w-100" srcDoc={code2} />}
        </CanvasContainer>
      )}
      {data.status === 200 ? (
        data.body.result
          .filter((checkElem) => checkElem.type === "ERC-721")
          .map((elem) => {
            return (
              <div>
                {false && <div>{elem.name}</div>}
                <div>NFT : Aimée</div>
                <img
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                  }}
                  src={nftImageURL}
                />
              </div>
            );
          })
      ) : (
        <div>Fetching Error</div>
      )}
    </ContentContainer>
  </MainContainer>
) : (
  <p>loading...</p>
);
