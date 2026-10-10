package com.example.yoga.config;

import com.example.yoga.model.YogaPoses;
import com.example.yoga.repository.YogaPosesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private YogaPosesRepository yogaPosesRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (yogaPosesRepository.count() == 0) {
            seedYogaPoses();
        }
    }

    private void seedYogaPoses() {
        List<YogaPoses> poses = Arrays.asList(
                // Basic Poses
                new YogaPoses(
                        "Mountain Pose (Tadasana)",
                        "Stand tall with feet together, arms at sides. Ground down through all four corners of feet. Engage thighs, lift kneecaps. Draw shoulders back and down.",
                        "Basic",
                        "basic2.jpg",
                        "Improves posture, strengthens thighs, knees and ankles, firms abdomen and buttocks, relieves sciatica"
                ),
                new YogaPoses(
                        "Child's Pose (Balasana)",
                        "Kneel on the floor, touch big toes together, sit on heels. Separate knees about hip-width. Exhale and lay torso down between thighs.",
                        "Basic",
                        "basic3.jpg",
                        "Gently stretches lower back, hips, thighs, knees and ankles, relaxes spine, shoulders and neck, calms the mind"
                ),
                new YogaPoses(
                        "Tree Pose (Vrksasana)",
                        "Stand on one leg, place sole of other foot on inner thigh or calf. Bring hands to prayer position at chest or extend overhead.",
                        "Basic",
                        "treeposeb.jpeg",
                        "Improves balance and stability, strengthens legs and core, increases focus and concentration"
                ),
                new YogaPoses(
                        "Corpse Pose (Savasana)",
                        "Lie flat on back with legs slightly apart, arms at sides with palms facing up. Close eyes and breathe naturally.",
                        "Basic",
                        "meditation.jpg",
                        "Reduces stress and anxiety, promotes deep relaxation, lowers blood pressure, calms the nervous system"
                ),

                // Intermediate Poses
                new YogaPoses(
                        "Warrior I (Virabhadrasana I)",
                        "Step one foot back, turn it 45 degrees. Bend front knee to 90 degrees. Raise arms overhead with palms together.",
                        "Intermediate",
                        "inter2.jpg",
                        "Strengthens legs, opens hips and chest, improves focus and balance, energizes entire body"
                ),
                new YogaPoses(
                        "Warrior II (Virabhadrasana II)",
                        "Similar to Warrior I but arms extend parallel to floor, gaze over front hand. Hips and torso face side.",
                        "Intermediate",
                        "inter3.jpg",
                        "Strengthens and stretches legs and ankles, improves stamina, stimulates abdominal organs"
                ),
                new YogaPoses(
                        "Triangle Pose (Trikonasana)",
                        "Stand with legs wide, turn one foot out. Reach toward that foot, place hand on shin or floor. Extend other arm up.",
                        "Intermediate",
                        "inter4.jpg",
                        "Stretches legs, hips, spine, chest and shoulders, improves digestion, relieves stress"
                ),
                new YogaPoses(
                        "Bridge Pose (Setu Bandha)",
                        "Lie on back, bend knees with feet flat. Press into feet and lift hips. Interlace hands under back.",
                        "Intermediate",
                        "inter5.jpg",
                        "Strengthens back, glutes and hamstrings, opens chest and shoulders, improves spine flexibility"
                ),
                new YogaPoses(
                        "Chair Pose (Utkatasana)",
                        "Stand with feet together, bend knees as if sitting in chair. Raise arms overhead. Keep weight in heels.",
                        "Intermediate",
                        "yogapose4.jpg",
                        "Strengthens thighs, ankles and calves, tones shoulders and abs, stimulates heart and diaphragm"
                ),

                // Advanced Poses
                new YogaPoses(
                        "Crow Pose (Bakasana)",
                        "Squat, place hands on floor. Bend elbows slightly, place knees on upper arms. Shift weight forward, lift feet.",
                        "Advanced",
                        "advance2.jpg",
                        "Strengthens arms, wrists and core, improves balance and body awareness, builds confidence"
                ),
                new YogaPoses(
                        "Headstand (Sirsasana)",
                        "Kneel, interlace fingers on floor. Place crown of head in hands. Straighten legs, walk feet toward face, lift legs.",
                        "Advanced",
                        "advance3.jpg",
                        "Improves circulation, strengthens core and shoulders, calms the mind, improves focus"
                ),
                new YogaPoses(
                        "Wheel Pose (Urdhva Dhanurasana)",
                        "Lie on back, bend knees and elbows. Place hands by ears, fingers toward shoulders. Press up to full backbend.",
                        "Advanced",
                        "advance4.jpg",
                        "Strengthens arms, legs, spine and abdomen, opens chest and lungs, energizes entire body"
                ),
                new YogaPoses(
                        "King Pigeon Pose (Kapotasana)",
                        "From kneeling, drop back into deep backbend. Catch feet with hands, arch spine deeply.",
                        "Advanced",
                        "advance5.jpg",
                        "Opens chest, shoulders and hip flexors, strengthens back muscles, improves spine flexibility"
                ),

                // Surya Namaskar (Sun Salutation) Sequence
                new YogaPoses(
                        "Sun Salutation - Prayer Pose",
                        "Stand at front of mat with feet together. Bring palms together in prayer position at heart center.",
                        "Basic",
                        "sun1.png",
                        "Centers the mind, calms the body, prepares for practice"
                ),
                new YogaPoses(
                        "Sun Salutation - Raised Arms",
                        "Inhale, raise arms overhead. Arch back slightly, looking up at thumbs.",
                        "Basic",
                        "sun2.png",
                        "Stretches abdomen, expands chest, improves digestion"
                ),
                new YogaPoses(
                        "Sun Salutation - Forward Fold",
                        "Exhale, bend forward from hips. Bring hands to floor beside feet. Relax head and neck.",
                        "Basic",
                        "sun3.png",
                        "Stretches hamstrings and spine, calms the mind, improves digestion"
                ),
                new YogaPoses(
                        "Sun Salutation - Low Lunge",
                        "Inhale, step right leg back into lunge. Left knee bent 90 degrees. Look forward or up.",
                        "Intermediate",
                        "sun4.png",
                        "Strengthens legs, opens hip flexors, improves balance"
                ),
                new YogaPoses(
                        "Sun Salutation - Plank",
                        "Step other leg back, body in straight line from head to heels. Engage core, arms straight.",
                        "Intermediate",
                        "sun5.png",
                        "Strengthens arms, wrists, core and spine, prepares for arm balances"
                ),
                new YogaPoses(
                        "Sun Salutation - Cobra",
                        "Lower body to floor, place hands under shoulders. Inhale, lift chest, keeping elbows bent.",
                        "Basic",
                        "sun6.png",
                        "Opens chest and lungs, strengthens spine, stimulates abdominal organs"
                ),
                new YogaPoses(
                        "Sun Salutation - Downward Dog",
                        "Exhale, lift hips up and back. Press hands and feet into floor, forming inverted V shape.",
                        "Intermediate",
                        "sun7.png",
                        "Stretches hamstrings, calves and spine, strengthens arms and legs, energizes body"
                ),

                // Additional Poses
                new YogaPoses(
                        "Lotus Pose (Padmasana)",
                        "Sit cross-legged, place each foot on opposite thigh with soles facing up. Spine straight, hands on knees.",
                        "Advanced",
                        "yogaposea.jpg",
                        "Opens hips, calms the mind, improves posture, enhances meditation"
                ),
                new YogaPoses(
                        "Extended Triangle Pose",
                        "Stand wide, turn one foot out. Reach toward foot with same-side hand. Extend other arm straight up.",
                        "Intermediate",
                        "yogaposeb1.jpg",
                        "Stretches entire side body, strengthens legs, improves balance"
                ),
                new YogaPoses(
                        "Seated Forward Bend",
                        "Sit with legs extended. Hinge at hips, reach toward feet. Keep spine long, relax shoulders.",
                        "Intermediate",
                        "yogaposei.jpg",
                        "Stretches spine, shoulders and hamstrings, calms the mind, relieves stress"
                ),
                new YogaPoses(
                        "Silent Meditation Pose",
                        "Sit comfortably with spine straight. Close eyes, focus on breath. Let thoughts come and go without judgment.",
                        "Basic",
                        "silent.jpg",
                        "Reduces stress and anxiety, improves focus and concentration, promotes inner peace"
                )
        );

        yogaPosesRepository.saveAll(poses);
        System.out.println("✅ Database seeded with " + poses.size() + " yoga poses!");
    }
}
